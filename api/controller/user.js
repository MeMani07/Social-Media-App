import { dbConnection } from "../utils/dbConnetion.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res)=>{

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("User not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const query = "SELECT * FROM users WHERE id=?";
        dbConnection.query(query, [req.query.userId], (err, data)=>{

            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        });
    });
};

export const getSuggestedUser = (req, res)=>{

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not Logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const query = "SELECT * FROM users WHERE id!=? AND id NOT IN (SELECT followingUserId FROM followings WHERE followerUserId=?)";
        dbConnection.query(query, [userInfo.id, userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};