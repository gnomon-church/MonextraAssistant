const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// Router for getting eod figures by date and store from the api
router.get('/figures-download/:Store/:Date', controllers.figuresDownload)
// Router for getting isi game types from the api
router.get('/isi-game-types-download', controllers.gameTypeDownload)
// Router for deleting an isi game
router.get('/isi-game-delete/:GAMEID', controllers.gameDelete)

// Router for sending eod figures to the api
router.post('/figures-upload', controllers.figuresUpload)
// Router for sending new isi game types to the api
router.post('/isi-game-types-upload', controllers.gameTypeUpload)



module.exports = router;