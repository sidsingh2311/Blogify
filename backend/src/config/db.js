import mongoose from "mongoose";

const connectDb = async () => {
      try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME || 'blogs'}`);
            console.log(`database connected successfully !! DB HOST: ${connectionInstance.connection.host}`);
            console.log(`Connected to database: ${connectionInstance.connection.name}`);
      }
      catch (error) {
            console.log("something went wrong in connecting database");
            process.exit(1);
      }
}

export { connectDb }