import { dbConnection } from "../utils/dbConnetion.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res)=>{

    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{

        if(err) return res.status(403).json("Invalid Token!");

        const q = "SELECT * FROM likes WHERE postId=?";
            
        dbConnection.query(q, [req.query.postId], async (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json((await data).map(likes=>likes.userId));
        });
    });

};

export const addLike = (req, res)=>{

    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{

        if(err) return res.status(403).json("Invalid Token!");

        const q = "INSERT INTO likes(`userId`,`postId`) VALUES(?,?)";
        
        dbConnection.query(q, [ userInfo.id, req.query.postId ], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });

};

export const deleteLike = (req, res)=>{

    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{

        if(err) return res.status(403).json("Invalid Token!");

        const q = "DELETE FROM likes WHERE postId=? AND userId=?";
        
        dbConnection.query(q, [req.query.postId, userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });

};