// imports for libraries/configurations
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

// import for files
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToDb from "./db/connectToDb.js";
import { app, server } from "./socket/socket.js";

// variable declare
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse incoming data into JSON payloads from req.body
app.use(cookieparser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
});

server.listen(PORT, () => {
    connectToDb();
    console.log(`Server running on port ${PORT}`)
});