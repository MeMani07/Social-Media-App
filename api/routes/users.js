import express from "express";
import { getSuggestedUser, getUser } from "../controller/user.js";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/suggest", getSuggestedUser);

export default userRouter;