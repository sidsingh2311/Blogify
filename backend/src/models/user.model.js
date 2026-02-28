import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// creating the schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        avatarPublicId: {
            type: String,
        },
        bio: {
            type: String,
        },
        location: {
            type: String,
        }
    }, {
    timestamps: true
}
)

// before storing the password we should bcrypt the password
userSchema.pre("save", async function () {
    // if the password is new or changes then only it bcrypt 
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// creating function to match the password
userSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// after the user is login issue a function to generate a access token
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET);
}

const User = mongoose.model("User", userSchema);

export default User;