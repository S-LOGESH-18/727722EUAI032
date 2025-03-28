const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const redis = require("redis");
const axios = require("axios");

const app = express();
const PORT = 4000;
const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTUyODA4LCJpYXQiOjE3NDMxNTI1MDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM4OWI3ZDlmLWI2NTktNDI2NC1hNzliLWNhMjgwZGQ2YmFhMCIsInN1YiI6IjcyNzcyMmV1YWkwMzJAc2tjZXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJza2NldCIsImNsaWVudElEIjoiMzg5YjdkOWYtYjY1OS00MjY0LWE3OWItY2EyODBkZDZiYWEwIiwiY2xpZW50U2VjcmV0IjoieFlqVWRBQ1BEVGhrd2ticiIsIm93bmVyTmFtZSI6IkxPR0VTSC5TIiwib3duZXJFbWFpbCI6IjcyNzcyMmV1YWkwMzJAc2tjZXQuYWMuaW4iLCJyb2xsTm8iOiI3Mjc3MjJFVUFJMDMyIn0.fWKTWcjETTMzctctZx3BVVl3DX-K3WCy2bStKvBkmWA";

const client = redis.createClient();
client.connect();

app.use(cors());
app.use(express.json());

async function fetchUsers() {
    const res = await axios.get("http://localhost:5000/users");
    return res.data;
}

async function fetchPosts() {
    const cachedPosts = await client.get("posts");
    if (cachedPosts) return JSON.parse(cachedPosts);

    const res = await axios.get("http://localhost:5000/posts");
    const posts = res.data;
    await client.setEx("posts", 60, JSON.stringify(posts)); 
    return posts;
}

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await axios.post("http://localhost:5000/users", { username, password: hashedPassword });
    res.json({ message: "User created" });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const users = await fetchUsers();
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.get("/posts", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, async (err) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const posts = await fetchPosts();
        res.json(posts);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
