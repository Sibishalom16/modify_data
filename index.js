const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { resolve } = require('path');
const menuRoutes = require("./routes/menuRoutes"); // Import menu routes once

dotenv.config();
const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(express.json()); 
app.use(express.static('static')); 
app.use("/menu", menuRoutes); // API routes for menu management

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
