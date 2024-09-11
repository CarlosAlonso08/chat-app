// imports for libraries/configurations
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
dotenv.config();

app.use(express.json()); // to parse incoming data into JSON payloads from req.body
app.use(cookieparser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToDb();
    console.log(`Server running on port ${PORT}`)
});