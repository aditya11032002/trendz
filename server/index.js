import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();

const connect = async() => {
    await mongoose.connect(process.env.MONGO).then(() => {

        console.log("Connected to Database");
    })
    .catch(err => {
        throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use((err, req,res, next)=>{
    const status = err.status || 500;
    const message = err.message|| "Something went wrong!";
    return res.status(status).json({
        success:false,
        status,
        message,
    });
});



// app.listen(8800, () => {
//     console.log("Connected to Server!");
// });

const port = process.env.PORT || 8800;

connect();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
