import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import cookieParser from "cookie-parser";
import commentRouter from "./routes/comments.js";
import likesRouter from "./routes/likes.js";
import userRouter from "./routes/users.js";
import relationShipRouter from "./routes/relationship.js";

const app = express();

// Middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
});
app.use('/public', express.static("public"));
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
}));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likesRouter);
app.use("/api/relations", relationShipRouter);


app.listen(8800, ()=>{
    console.log("API is working for now!");
})
