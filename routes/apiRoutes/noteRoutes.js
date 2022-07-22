const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const notes = require("../../db/db.json");
const { v4: uuid } = require("uuid");

router.get("/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  let results = findByID(req.params.id, notes);
  if (results) {
    res.json(results);
  } else {
    res.sendStatus(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = uuid();
  let notesArray = notes;
  notesArray.push(req.body);
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  res.json(req.body);
});

router.delete("/notes/:id", (req, res) => {
  let id = req.params.id;
  let notesArray = notes;
  for (i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id === id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notesArray, null, 2)
      );
    }
  }
  res.json(notesArray);
});

module.exports = router;
