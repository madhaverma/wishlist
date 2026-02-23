import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();



mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    wishlist: [String]
});

const User = mongoose.model("User", userSchema);

export default User;