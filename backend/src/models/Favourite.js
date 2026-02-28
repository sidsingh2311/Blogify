import mongoose,{Schema} from "mongoose";

const favSchema = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        },
        user: {
            type:Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timeStamps: true
    }
) 

const Favourite = mongoose.model("Favourite",favSchema)

export default Favourite