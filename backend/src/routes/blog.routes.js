import { Router } from "express"
import { createBlog, getBlogs, getUserBlogs, updateBlog, deleteBlog, getSingleBlog, getFeaturedBlogs, addComment, getComments, addToFavourite, getFavouriteBlogs } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"
import { optionalJwt } from "../middlewares/optionalJwt.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, upload.single("image"), createBlog);
router.route("/:id/update").put(verifyJWT, upload.single("image"), updateBlog);
router.route("/get-blogs").get(getBlogs);
router.route("/get-user-blogs").get(verifyJWT, getUserBlogs)
router.route("/:id/delete").get(verifyJWT, deleteBlog)
router.route("/:id/get-blog").get(verifyJWT, getSingleBlog);
router.route("/get-featured-blogs").get(getFeaturedBlogs);
router.route("/:id/get-blog-front").get(optionalJwt, getSingleBlog);
router.route("/add-comment").post(verifyJWT, addComment)
router.route("/get-comments/:id").get(getComments);
router.route("/add-to-favourite").post(verifyJWT, addToFavourite)
router.route("/get-favourite-blogs").get(verifyJWT, getFavouriteBlogs)

export default router