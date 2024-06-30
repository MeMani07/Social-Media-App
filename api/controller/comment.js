import jwt from "jsonwebtoken";
import { dbConnection } from "../utils/dbConnetion.js";
import moment from "moment";

export const getComments = (req, res)=>{

    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User Not loggedIn!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token Invalid!");
    
        const q = "SELECT c.*, u.profilePic, u.name as userName FROM comments as c JOIN users as u ON (c.userId=u.id) WHERE c.postId=? ORDER BY c.createdAt DESC";

        dbConnection.query(q, [req.query.postId] ,(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const getCommentsCount = (req, res)=>{
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User Not loggedIn!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token Invalid!");
    
        const q = "SELECT COUNT(*) AS commentCount FROM comments WHERE postId=?";

        dbConnection.query(q, [req.query.postId] ,(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        });
    });
}

export const addComment = (req, res)=>{

    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User Not loggedIn!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token Invalid!");
    
        const q = "INSERT INTO comments(`desc`,`createdAt`,`userId`,`postId`) VALUES(?)";

        const VALUES = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.query.postId
        ];

        dbConnection.query(q, [VALUES] ,(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Comment is added");
        });
    });

};

export const deleteComment = (req, res)=>{

    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("User Not loggedIn!");
    console.log("Got in to the function");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token Invalid!");
    
        const q = "DELETE FROM comments WHERE userId=? AND postId=?";

        const VALUES = [
            userInfo.id,
            req.query.postId
        ];

        dbConnection.query(q, [VALUES] ,(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Comment is added");
        });
    });

};