const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = `${process.env.MONGODB_URI}`;

// CORS SETUP
app.use(cors());

// app.use(
//   cors({
//     // origin: "http://localhost:5173", // Vite frontend
//     origin: "https://recipe-book-front-end.vercel.app", // Vite production
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// const allowedOrigins = [
//   "http://localhost:5173", // Vite dev
//   "https://recipe-book-front-end.vercel.app", // Production
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like Postman)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true, // If you're using cookies or auth headers
//   })
// );

// BODY PARSER
app.use(express.json()); // built-in body parser

// CONNECT TO MONGODB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// DEFINE MODEL
const RecipeSchema = new mongoose.Schema({}, { strict: false });
const Recipe = mongoose.model("Recipe", RecipeSchema, "recipes");

// ROUTES:
// Check if server is running
app.get("/", (req, res) => {
  res.send("<h1>🍽️ Recipe Book API</h1><p>Welcome to the API</p>");
});

// CREATE
app.post("/recipes", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
app.get("/recipes/:id", async (req, res) => {
  try {
    console.log(req.params.id, "read one");
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
app.put("/recipes/:id", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET My Items by userId
// backend route
app.get("/recipes/my-items/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const items = await Recipe.find({ userId }); // ✅ filters correctly
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH - Like a recipe
app.patch("/recipes/:id/like", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } }, // Increment likeCount atomically
      { new: true } // Return the updated document
    );
    if (!updated) return res.status(404).json({ error: "Recipe not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
