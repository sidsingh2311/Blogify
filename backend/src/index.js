import dotenv from "dotenv/config"
import { app } from "./app.js"
import { connectDb } from "./config/db.js"

const PORT = process.env.PORT || 8000

// calling the connectdb function 
// if theconnection is successsfult then start the server 
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
      console.log(`CORS allowed origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  })
  .catch(() => {
    console.log("error in connecting mongodb");
  })