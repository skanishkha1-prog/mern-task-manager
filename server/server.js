const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express();

app.use(cors({
  origin: "https://mern-task-manager-jade-three.vercel.app",
  credentials: true
}));app.use(express.json());

app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const authRoutes =
require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const taskRoutes =
require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);