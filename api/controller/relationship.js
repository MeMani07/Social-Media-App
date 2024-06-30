import { dbConnection } from "../utils/dbConnetion.js";
import jwt from "jsonwebtoken";

export const getRelationShips = (req, res)=>{
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("User not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const query = "SELECT followingUserId FROM followings WHERE followerUserId=?";
        dbConnection.query(query, [req.query.userId], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data.map(obj=>obj.followingUserId));
        });

    });

}

export const addRelationShips = (req, res)=>{
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("User not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const query = "INSERT INTO followings(`followerUserId`,`followingUserId`) VALUES(?,?)";
        dbConnection.query(query, [userInfo.id, req.query.userId], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Follower user Successfully");
        });

    });

}

export const deleteRelationShips = (req, res)=>{
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Sample Login!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const query = "DELETE FROM followings WHERE followerUserId=? AND followingUserId=?";
        dbConnection.query(query, [userInfo.id, req.query.userId], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Deleted");
        });
    });
}