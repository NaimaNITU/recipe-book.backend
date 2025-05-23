const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS SETUP
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// CONNECT TO MONGODB
const MONGODB_URI = `${process.env.MONGODB_URI}`;

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

// Create
app.post("/recipes", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DEFINE MODEL
const RecipeSchema = new mongoose.Schema({}, { strict: false });
const Recipe = mongoose.model("Recipe", RecipeSchema, "recipes");

// ROUTES

// check server ok or not
app.get("/", (req, res) => {
  res.send("<h1>🍽️ Recipe Book API</h1><p>Welcome to the API</p>");
});

// BODY PARSER
app.use(express.json());
