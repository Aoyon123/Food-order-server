const express = require("express");
const mysql = require("mysql");
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foodDb",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("db connected");
});
app.listen("5000", () => {
  console.log("server started on port 5000");
});
app.get("/addUser", (req, res) => {
  let post = {
    dateOfBirth: "2021-12-30",
    email: "fahamidulaoyon@gmail.com",
    fullName: "ssfgk",
    password: "1234569",
    username: "nihal",
  };
  let sql = "INSERT INTO tblUsers SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("New User created");
    res.send("New user created");
  });
});
app.get("/users", (req, res) => {
  let sql = "SELECT * FROM tblUsers";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});
