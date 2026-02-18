import mongoose from "mongoose";

mongoose.connect("moongodb://localhost:27017/wishlist");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    wishlist: [String]
});

const User = mongoose.model("User", userSchema);

export default User;