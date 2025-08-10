require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectMongo = require("./config/mongo");
const { connectPostgres } = require("./config/postgres");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
    res.json({ message: "API is working 🚀" });
});

// Connect DBs
connectMongo();
connectPostgres();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
