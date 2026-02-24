import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./userModel.js";
import Wishlist from "./wishlistModel.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const rawOrigins = process.env.FRONTEND_URLS || "http://localhost:5173,http://127.0.0.1:5173";
const allowedOrigins = rawOrigins.split(",").map((origin) => origin.trim()).filter(Boolean);

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in backend environment");
}

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbUp = dbState === 1;

  res.status(dbUp ? 200 : 503).json({
    status: dbUp ? "ok" : "degraded",
    service: "wishlist-backend",
    dbConnected: dbUp,
    env: NODE_ENV,
  });
});

app.post("/signup", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

app.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  return res.json({ message: "Logged out successfully" });
});

app.post("/wishlist", verifyToken, async (req, res) => {
  try {
    const title = (req.body?.title || "").trim();
    const description = (req.body?.description || "").trim();
    const url = (req.body?.url || "").trim();

    if (!title || !description) {
      return res.status(400).json({ message: "title and description are required" });
    }

    const item = await Wishlist.create({
      title,
      description,
      url,
      user: req.user.id,
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/wishlist", verifyToken, async (req, res) => {
  const items = await Wishlist.find({ user: req.user.id }).sort({ createdAt: -1 });
  return res.json(items);
});

app.put("/wishlist/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  const title = (req.body?.title || "").trim();
  const description = (req.body?.description || "").trim();
  const url = (req.body?.url || "").trim();

  if (!title || !description) {
    return res.status(400).json({ message: "title and description are required" });
  }

  const updatedItem = await Wishlist.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { title, description, url },
    { new: true }
  );

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json(updatedItem);
});

app.delete("/wishlist/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  const deletedItem = await Wishlist.findOneAndDelete({
    _id: id,
    user: req.user.id,
  });

  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json({ message: "Item deleted" });
});

app.use((err, _req, res, _next) => {
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({ message: err.message });
  }
  return res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
