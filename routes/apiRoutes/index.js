const router = require("express").Router();
const notes = require("./noteRoutes");

router.use(notes);

module.exports = router;
