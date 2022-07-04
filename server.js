const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.use(express.static("public"));
//create a route to go to the notes html page and the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, ".public/notes.html"));
});
//create a get route
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});
//post a note
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let notes = JSON.parse(data);
      let uuid = uuidv4();
      req.body.id = newID;
      const newNote = { ...req.body, id: uuidv4() };
      notes.push(newNote);
      fs.writeFile(".db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          res.json("successfull added");
          console.log("successfully added");
        }
      });
    }
  });
});
//delete a note
app.delete("./api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let notes = JSON.parse(data);
      const id = req.params.id;
      let deleteNote = notes.filter((note) => {
        note.id !== id;
      });
      fs.watchFile("./db/db.json", JSON.stringify(deleteNote), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json("successfully added");
          console.log("note has been deleted");
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
