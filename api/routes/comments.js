import express from "express";
import { getComments, addComment, getCommentsCount } from "../controller/comment.js";

const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.get("/count", getCommentsCount);
commentRouter.post("/",addComment);

export default commentRouter;