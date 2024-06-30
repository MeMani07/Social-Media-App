import jwt from "jsonwebtoken";
import { dbConnection } from "../utils/dbConnetion.js";
import moment from "moment";

export const getPosts = (req, res)=>{

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("User not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err){
            return res.status(403).json("Token Invalid!");
        }

        const q = "SELECT p.*, profilePic, name from posts as p JOIN users as u ON (p.userId=u.id) where p.userId=? OR p.userId IN (SELECT followingUserId from followings where followerUserId=?) ORDER BY createdAt DESC";
    
        dbConnection.query(q, [userInfo.id, userInfo.id], (err,data)=>{
            if(err) return res.status(400).json("Something went wrong!");
            return res.status(200).json(data);
        });
    });
};

export const getUserPosts = (req, res)=>{

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("User not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err){
            return res.status(403).json("Token Invalid!");
        }

        const q = "SELECT p.*, profilePic, name from posts as p JOIN users as u ON (p.userId=u.id) where p.userId=? ORDER BY createdAt DESC";
    
        dbConnection.query(q, [req.query.userId], (err,data)=>{
            if(err) return res.status(400).json("Something went wrong!");
            return res.status(200).json(data);
        });
    });
};

export const addPost = (req, res)=>{

    const token = req.cookies.accessToken;

    const file = req.file;

    const imageUrl = file ? `http://localhost:8800/public/images/${file.filename}` : "";

    if (!token){
        res.status(401).json("User not Logged in!");
    }

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const VALUES = [
            req.body.desc,
            imageUrl,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ];

        const q = "INSERT INTO posts(`desc`,`pic`,`createdAt`,`userId`) VALUES(?)";
    
        dbConnection.query(q, [VALUES], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}

export const deletePost = (req, res)=>{

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("User not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) =>{

        if(err) return res.status(403).json("Token Invalid!");

        const q = "DELETE FROM posts WHERE id=? AND userId=?";
    
        dbConnection.query(q, [req.query.postId,userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Post Deleted");
            return res.status(403).json("You cannot delete other user posts");
        });
    });
}