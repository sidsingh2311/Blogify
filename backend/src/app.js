import express from "express"
import cors from "cors";
import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({limit: "200kb"})); 
app.use(express.urlencoded({limit: "200kb"}));
app.use(express.static("public"));  

// after importing the userrouter 
// declraring the userouter
app.use('/api/users',userRouter);
app.use("/api/blogs",blogRouter);

export {app}