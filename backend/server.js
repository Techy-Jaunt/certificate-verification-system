const express = require('express');
const certificateRoutes = require('./routes/certificateRoutes');
const dotenv = require("dotenv");

//loads the environmental varibles from the env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', certificateRoutes);


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});