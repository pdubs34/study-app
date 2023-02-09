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

app.get("/cards", (req, res) => {
    db.query("SELECT * FROM sets", (err, result) => {
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

  db.query(
    "INSERT INTO sets (userId,cards) VALUES (?,?)",
    [userId,cards],
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
  db.query("SELECT userId FROM loginuser WHERE username = ? AND userPassword = ?",[user,pass],(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("running");
});