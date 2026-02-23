import express from "express";
import User from "./userModel.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();



const app = express();
const port = 3000;
const secretKey = process.env.JWT_SECRET ;


app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

//Middleware  verification 

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Login


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      
      sameSite: "lax"
    });

    res.json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});


// Logout


app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// crud operations 


app.post("/wishlist", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    const item = await Wishlist.create({
      title,
      description,
      user: req.user.id
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});   


// read
app.get("/wishlist", verifyToken, async (req, res) => {
  const items = await Wishlist.find({ user: req.user.id });
  res.json(items);
});

// update
app.put("/wishlist/:id", verifyToken, async (req, res) => {
  const { title, description } = req.body;

  const updatedItem = await Wishlist.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id }, // secure
    { title, description },
    { new: true }
  );

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(updatedItem);
});

app.delete("/wishlist/:id", verifyToken, async (req, res) => {
  const deletedItem = await Wishlist.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json({ message: "Item deleted" });
});
console.log(" create logout button  ");
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})