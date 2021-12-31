const express = require("express");
// const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Fahamidul:aoyonabc@cluster0.dxczq.mongodb.net/food?retryWrites=true&w=majority";

app.listen("5000", () => {
  console.log("server started on port 5000");
});
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log("error", err);
  const collection = client.db("food").collection("tblUsers");

  console.log("database Connected");
  app.get("/users", (req, res) => {
    collection.find().toArray((err, result) => {
      res.send(result);
    });
  });
  app.post("/addUser", (req, res) => {
    const newUser = req.body;
    console.log("adding new user ", newUser);
    collection.insertOne(newUser).then((result) => {
      console.log("inserted count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/login", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password)
    const user = await collection.findOne({username:username})
    if(user.password === password){
        res.send("Valid user");
        console.log("Valid User")
    }
    else{
        res.send("Invalid User");
        console.log("Invalid user")
    }
    
  });
  app.get("/user/:email",(res,req)=>{
    cartCollection.find({ email: req.params.email })
    .toArray((err, user) => {
      res.send(user)
    })
  })
  // perform actions on the collection object
});

/*
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

app.post("/addUser", (req, res) => {
  let post = {
    dateOfBirth: "2021-12-30",
    email: "fahamidulaoyon@gmail.com",
    fullName: "ssfgk",
    password: "1234569",
    username: "nihal1",
  };
  let sql = "INSERT INTO tblUsers SET ?";
  let query = db.query(sql, req.body, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("New User created");
    res.send("New user created");
  });
});
// app.post("/addUser", (req, res) => {
//   const newUser = req.body;
//   var sql =
//     "SET @fullName = ?;SET @email = ?;SET @dateOfBirth = ?;SET @username = ?; SET @password = ?; \
//     CALL tblUsers(@fullName,@email,@dateOfBirth,@username, @password);";
//   let query = db.query(
//     sql,
//     [
//       newUser.fullName,
//       newUser.email,
//       newUser.dateOfBirth,
//       newUser.username,
//       newUser.password,
//     ],
//     (err, rows, fields) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       } else {
//         console.log("New User created", rows);
//         res.send("New user created");
//       }
//     }
//   );
// });

app.get("/users", (req, res) => {
  let sql = "SELECT * FROM tblUsers";
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result);
    res.send(result);
  });
});*/
