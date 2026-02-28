import mongoose,{Schema}from "mongoose";

const commentSchema = new Schema(
    {
        comment: {
            type:String,
            required: true
        },
        user: {
            type:Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        blog: {
            type:Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        }
    },
    {
        timestamps: true
    }
)
const comment = mongoose.model("Comment",commentSchema);
export default comment;