import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});



import User from "./models/User.js";

app.get("/test-user", async (req, res) => {
    const user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
    });

    res.json(user);
});




export default app;
