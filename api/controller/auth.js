import { dbConnection } from "../utils/dbConnetion.js";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req,res) => {

    // Check if the user is already available in the database or not!
    const query = "SELECT * FROM users WHERE username = ?";

    dbConnection.query(query, [req.body.username], (err,data)=>{
        
        if(err) return res.status(500).json(err);

        if(data.length) return res.status(409).json("User Already Exists!");

        
        // If not present should be added to the database

        // Hash the password for security purposes
        const salt = bycrpt.genSaltSync(10);
        const hashedPassword = bycrpt.hashSync(req.body.password, salt);

        const query = "INSERT INTO users(`username`, `email`, `password`, `name`) VALUES(?)";

        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,
        ]

        dbConnection.query(query, [values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created!");
        });

    });

};

export const login = (req,res) => {

    // Query for the user in the database
    const query = "SELECT * FROM users WHERE username = ?";

    dbConnection.query(query, [req.body.username], (err, data)=>{

        if(err) return res.status(500).json(err);
        if(data.length == 0) return res.status(404).json("User not found!");

        // If the user is found i.e., data.length > 0 
        // Check the password and return the user
        const confirmPassword = bycrpt.compareSync(req.body.password, data[0].password);
        if(!confirmPassword) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const {password, ...others} = data[0];

        return res.cookie("accessToken", token, {
                httpOnly: true,
        }).status(200).json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };