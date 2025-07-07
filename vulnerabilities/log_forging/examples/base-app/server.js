const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const port = 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

// Mock user database (in production, use a real database)
const users = [
  {
    id: 1,
    username: "admin",
    // Password: 'admin123' (hashed)
    password: "$2b$10$3euPcmQFCiblsZeEu5s7p.9BUeYN8p3w1Gx6I1RqB3ZtZtZtZtZtZt",
  },
];


app.get("/", (req, res) => {
  res.send(`<h1>Welcome to VibeGoat Logging Server</h1>
<p>Try <code>/status</code>, <code>/login</code>, or <code>/dashboard</code> after login.</p>`);
});

app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const redirectUrl = req.query.redirect || "/dashboard";

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    console.log("Failed login attempt - user not found:", username, "from IP:", req.ip);
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Failed login attempt - invalid password:", username, "from IP:", req.ip);
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.userId = user.id;
  req.session.username = user.username;
  console.log("User login successful: ", username);
  res.redirect(redirectUrl);
});

app.get("/dashboard", (req, res) => {
  if (!req.session.userId) {
    console.log("Unauthorized access attempt by ", req.ip);
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({ message: `Welcome ${req.session.username}!` });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Could not log out" });
    console.log("User logged out: ", req.session.username);
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
