import express from "express";
import { getPosts, addPost, getUserPosts, deletePost } from "../controller/post.js";
import upload from "../utils/multer.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/user", getUserPosts);
postRouter.post("/add",upload.single('pic'), addPost);
postRouter.delete("/delete", deletePost);

export default postRouter;