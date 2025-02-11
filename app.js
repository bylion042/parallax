const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = require("./routes/socket")(server); // Import and set up socket.io

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

app.get("/swap", (req, res) => res.render("swap"));

app.get("/admin", (req, res) => res.render("admin"));



// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
