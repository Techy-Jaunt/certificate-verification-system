const express = require("express");
const certificateRoutes = require("./routes/certificateRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = {};

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://techyjauntalumni.vercel.app"],
    methods: ["GET", "POST"],
  }),
);

// Routes
app.use("/api", certificateRoutes);
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
