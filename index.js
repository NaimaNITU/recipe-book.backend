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

// BODY PARSER
app.use(express.json());
