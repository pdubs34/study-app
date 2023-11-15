const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

const SENDGRID_API_KEY = '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'; // Replace with your actual API key
sgMail.setApiKey(SENDGRID_API_KEY);


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

app.post("/addUser", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const userPassword = req.body.userPassword;
  const email = req.body.email;

  db.query(
    "INSERT INTO loginuser(name,username,userPassword,email) VALUES (?,?,?,?)",
    [name,username,userPassword,email],
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

app.get("/confirm/:name/:username/:userPassword/:email", (req, res) => {
  const name = req.params.name;
  const username = req.params.username;
  const userPassword = req.params.userPassword;
  const email = req.params.email;
  db.query(
    "INSERT INTO loginuser(name,username,userPassword,email) VALUES (?,?,?,?)",
    [name,username,userPassword,email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully creation of page, you may close this and log in");
      }
    }
  );
});

app.post('/send-confirmation-email', async (req, res) => {
  const recipientEmail = req.body.email;
  const confirmationLink = req.body.confirmationLink;
  const msg = {
    to: recipientEmail,
    from: 'pwebb2002@gmail.com', // Replace with your desired "from" email address
    subject: 'Confirmation Email',
    html: `<p>Click the following link to confirm your email: <a href="${confirmationLink}"target="_self">${confirmationLink}</a></p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});


app.listen(3001, () => {
    console.log("running");
});