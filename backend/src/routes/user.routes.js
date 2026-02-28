import { Router } from "express"
import { changePassword, getUser, login, register, updateProfile, updateProfilePic } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/jwt.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-profile").put(verifyJWT, updateProfile);
router.route("/update-profile-pic").put(verifyJWT, upload.single("image"), updateProfilePic)
router.route("/fetch-user").get(verifyJWT, getUser)
router.route("/change-password").put(verifyJWT, changePassword)

export default router;