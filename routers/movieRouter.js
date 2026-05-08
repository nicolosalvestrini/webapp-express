const express = require("express");
const router = express.Router();
const movieController = require('./../controllers/moviesController')


// INDEX → lista
router.get("/", movieController.index );

// SHOW → dettaglio
router.get("/:id", movieController.show);

module.exports = router;