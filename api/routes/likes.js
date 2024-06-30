import express from "express";
import { addLike, deleteLike, getLikes } from "../controller/like.js";

const likesRouter = express.Router();

likesRouter.get("/",getLikes);
likesRouter.post("/",addLike);
likesRouter.delete("/",deleteLike);

export default likesRouter;