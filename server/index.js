const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");
app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "Wendis112!",
    database: "flashcardapp",
    port:"8800"
});

app.get("/cards/:userId/:setId", (req, res) => {
    const user = req.params.userId;
    const set = req.params.setId;
    db.query("SELECT cards FROM sets where userId = ? and setId = ?",[user,set], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.put("/updateCards", (req, res) => {
  const cards = req.body.cards;
  const setId = req.body.setId;
  db.query(
    "UPDATE sets SET cards = ? WHERE setId = ?",
    [cards, setId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addCardToDB", (req, res) => {
  const userId = req.body.userId;
  const cards = req.body.cards;
  const setName = req.body.setName
  db.query(
    "INSERT INTO sets (userId,cards,setName) VALUES (?,?,?)",
    [userId,cards,setName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.get("/validateLogin/:username/:password", (req, res) => {
  const user = req.params.username;
  const pass = req.params.password;
  db.query("SELECT userId,username FROM loginuser WHERE username = ? AND userPassword = ?",[user,pass],(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getUserSets/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT setName,setId FROM sets WHERE  userId = ?",[userId],(err, result) => {
    if(err){
      console.log(err)
    }
    else{
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("running");
});