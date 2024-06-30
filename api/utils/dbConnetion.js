import mysql from "mysql";

export const dbConnection = mysql.createConnection(
    {
    host:"localhost",
    user:"root",
    password:"root",
    database:"social_media"
}
)