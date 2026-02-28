import Blog from "../models/blog.model.js";
import { uploadCloudinary } from "../helpers/cloudinary.js";
import CommentModel from "../models/comment.model.js";
import User from "../models/user.model.js"
import Favourite from "../models/Favourite.js";

// method to creat the blog  
const createBlog = async (req, res) => {
    try {
        const { title, content, read_time, status, category, is_featured } = req.body;

        if ([title, category].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "Title and category are required fields",
                data: {}
            })
        }

        // creating the blog
        const blogObj = {
            title,
            content,
            read_time,
            status,
            category,
            is_featured,
            user: req.user?._id
        }

        const filePath = req?.file?.path

        if (filePath) {
            const response = await uploadCloudinary(filePath);
            blogObj.image = response.url;
        }

        // passing the blogobject into the blog model
        const blog = await Blog.create(blogObj)

        return res.status(200).json({
            success: true,
            message: "Blog added successfully",
            data: {
                blog: blog
            }
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

// method to get the data of single blog
const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.params?.id;
        const blog = await Blog.findById(blogId).populate("user", "-password");

        if (!blog) {
            // if not got the blog with that id 
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                data: {}
            })
        }

        // check if the blog exixts in  user fav list
        let isFavourite = false;

        if (req?.user?._id) {
            const fav = await Favourite.findOne({
                user: req?.user?._id,
                blog: blogId
            })
            if (fav) isFavourite = true;
        }

        // if got the blog with that id
        return res.status(200).json({
            success: true,
            message: "",
            data: {
                blog,
                isFavourite
            },
        })
    }
    catch (error) {
        return res.status(200).json({
            success: true,
            message: error.message,
            data: {},
        })
    }
}

const updateBlog = async (req, res) => {

    const params = req.params;
    const blogId = params.id

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
            data: {}
        })
    }

    const { title, content, read_time, status, category, is_featured } = req.body;

    if ([title, category].some((field) => field?.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "Title and category are required fields",
            data: {}
        })
    }

    // creating the blog
    const blogObj = {
        title,
        content,
        read_time,
        status,
        category,
        is_featured,
    }

    const filePath = req?.file?.path
    if (filePath) {
        const response = await uploadCloudinary(filePath);
        blogObj.image = response.url;
    }

    const updatedBlog = await Blog.findOneAndUpdate(
        {
            _id: blogId
        },
        {
            $set: blogObj
        },
        {
            new: true
        }
    )

    return res.status(200).json({
        success: true,
        message: "Blog updates successfully",
        data: {
            blog: updatedBlog
        }
    })

}

// method to fetch the blog 
const getBlogs = async (req, res) => {
    try {

        const { category, limit } = req.query;

        let filter = {
            status: "active"
        }
        //  only those blog which will be fetched will be considered 
        if (category && category != "all") {
            filter.category = category
        }
        const blogs = await Blog.find(filter).populate("user", "-password").sort({ createdAt: -1 }).limit(limit);

        return res.status(200).json({
            success: true,
            message: "",
            data: {
                blogs: blogs
            }
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

// methodnto get the user blogs
const getUserBlogs = async (req, res) => {
    try {
        const userId = req?.user?._id;

        const blogs = await Blog.find({ user: userId })

        res.status(200).json({
            success: true,
            message: "",
            data: {
                blogs
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: {}
        })
    }
}

// method to dekete blog
const deleteBlog = async (req, res) => {

    try {
        const blogId = req.params.id
        const userId = req?.user?._id

        const blog = await Blog.findOne({
            _id: blogId,
            user: userId
        })

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                data: {}
            })
        }

        await Blog.deleteOne({
            _id: blogId
        })

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: {}
        })
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Something went wrong",
            data: {}
        })
    }
}

// method to get the featured blogs 
const getFeaturedBlogs = async (req, res) => {
    try {
        const { limit } = req.query;
        // we will find only those blogs who are active
        let Filter = {
            status: "active",
            is_featured: "yes",
        }

        // get the blogs satisfying the creteria of the filter
        const blogs = await Blog.find(Filter).populate("user", "-password").sort({ createdAt: -1 }).limit(limit);
        res.status(200).json({
            success: true,
            message: "",
            data: {
                blogs,
            },
        })
    }
    catch (error) {
        return res.status(200).json({
            success: true,
            message: error.message,
            data: {},
        })
    }
}

// method to add the comment
const addComment = async (req, res) => {
    try {
        const { id, comment } = req.body;

        const userId = req?.user?._id

        if (comment.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "comment feild is required",
                data: {},
            })
        }

        const newComment = await CommentModel.create({
            comment: comment,
            user: userId,
            blog: id
        })

        const latestComment = await CommentModel.findById(newComment._id).populate("user", "-password");

        return res.status(200).json({
            success: true,
            message: "comment added succesffully",
            data: {
                comment: latestComment
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: {},
        })
    }
}

// method to get the comments
const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await CommentModel.find({ blog: blogId }).populate("user", "-password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "",
            data: {
                comments,
            },
        })
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: {},
        })
    }
}

// method to add to favourites
const addToFavourite = async (req, res) => {
    try {
        // check if the blog exists
        const { blogId } = req.body;
        const userId = req?.user?._id
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found",
                data: {}
            })
        }
        // check if the user exists  
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            })
        }


        const favourite = await Favourite.findOne({
            user: userId,
            blog: blogId
        })
        let message = "";
        let isFavourite = true;
        if (!favourite) {
            // if the blog is not found in existing favourite list then add a recoed in db
            await Favourite.create({
                blog: blogId,
                user: userId
            })
            message = "Blog added to favourite list"
            isFavourite = true;
        }
        else {
            // if the blog is found in favourite list then delete the record from the db
            await Favourite.deleteOne({
                blog: blogId,
                user: userId
            })
            message = "blog removed from the favourite list"
            isFavourite = false;
        }

        return res.status(200).json({
            success: true,
            message: message,
            data: {
                isFavourite
            }
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

// method to get the favouroite blogs 
const getFavouriteBlogs = async (req, res) => {
    try {
        // getting the user id
        const userId = req?.user?._id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            })
        }

        const favourites = await Favourite.find({
            user: userId
        }).populate({
            path: "blog",
            populate: {
                path: "user",
                select: "name"
            }
        })

        res.status(200).json({
            success: true,
            message: "",
            data: {
                favourites
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}


export { createBlog, updateBlog, getBlogs, getUserBlogs, deleteBlog, getSingleBlog, getFeaturedBlogs, addComment, getComments, addToFavourite, getFavouriteBlogs }