import express from "express";
import { addRelationShips, deleteRelationShips, getRelationShips } from "../controller/relationship.js";

const relationShipRouter = express.Router();

relationShipRouter.get("/", getRelationShips);
relationShipRouter.post("/", addRelationShips);
relationShipRouter.delete("/", deleteRelationShips);

export default relationShipRouter;