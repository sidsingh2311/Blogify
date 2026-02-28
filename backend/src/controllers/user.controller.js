import User from "../models/user.model.js";
import { uploadCloudinary } from "../helpers/cloudinary.js"

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        // checking if any of the field name email or password is empty
        if ([name, email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
                data: {}
            })
        }

        const normalizedEmail = email?.trim().toLowerCase();
        // checking if the email already exists 
        const userexists = await User.findOne({ email: normalizedEmail });
        if (userexists) {
            return res.status(400).json({
                success: false,
                message: "email already exists please enter another email",
                data: {}
            })
        }

        const user = await User.create({
            email: normalizedEmail,
            name,
            password
        })

        const newUser = await User.findById(user._id).select('-password')

        return res.status(200).json({
            success: true,
            message: "you have registered sucessfully",
            data: newUser
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

// making cintrollers for login 
const login = async (req, res) => {
    try {
        // validatin the email and password
        const { email, password } = req.body;
        if ([email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: {}
            })
        }

        const normalizedEmail = email?.trim().toLowerCase();
        // checking if the user exists
        const user = await User.findOne({ email: normalizedEmail })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
                data: {}
            })
        }

        const isPasswordMatched = await user.isPasswordMatched(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials (password mismatch)",
                data: {}
            });
        }

        const accessToken = await user.generateAccessToken();

        return res.status(200).json({
            success: true,
            message: "",
            data: {
                accessToken: accessToken
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

// method to get the user 
const getUser = async (req, res) => {
    try {
        const userId = req?.user?._id

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is blank",
                data: {}
            });
        }

        const userData = await User.findById(userId).select("-password");

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "userdata not found",
                data: {}
            })
        }

        return res.status(200).json({
            success: true,
            message: "",
            data: {
                user: userData
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: {}
        });
    }

}

// method to update the user profile
const updateProfile = async (req, res) => {
    try {
        const { name, bio, location } = req.body;
        const userId = req?.user?._id

        if (name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "the name feild is required",
                data: {}
            })
        }

        await User.updateOne(
            {
                _id: userId
            },
            {
                $set: {
                    name: name,
                    location: location,
                    bio: bio
                }
            }
        )

        const latestUserData = await User.findById(userId).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updates successfully",
            data: {
                user: latestUserData
            }
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: {}
        })
    }
}

// method to update the user prpofile pic
const updateProfilePic = async (req, res) => {
    try {
        const userId = req?.user?._id;
        const filePath = req?.file?.path;

        if (!filePath) {
            return res.status(400).json({
                success: false,
                message: "No image file provided",
                data: {}
            });
        }

        const profilePic = await uploadCloudinary(filePath);

        if (!profilePic) {
            return res.status(500).json({
                success: false,
                message: "Error uploading image to cloudinary",
                data: {}
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            avatar: profilePic.url,
            avatarPublicId: profilePic.public_id
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile picture changed successfully",
            data: {
                url: profilePic.url
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: {}
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const userId = req?.user?._id;
        if ([newPassword, oldPassword].some(field => field.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "new password and old password cannnot be same",
                data: {}
            });
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            })
        }

        // matching the password from the db
        const passwordMatched = await user.isPasswordMatched(oldPassword)
        if (!passwordMatched) {
            return res.status(404).json({
                success: false,
                message: "your old password is incorrect",
                data: {}
            })
        }

        user.password = newPassword
        await user.save();

        return res.status(200).json({
            success: true,
            message: "password changed successfully",
            data: {}
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

export { register, login, updateProfile, getUser, updateProfilePic, changePassword };