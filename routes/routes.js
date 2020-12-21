const express = require('express');
const router = express.Router();

const EODControllers = require('../controllers/EODControllers');
const ISIControllers = require('../controllers/ISIControllers');

// Router for getting eod figures by date and store from the api
router.get('/figures-download/:Store/:Date', EODControllers.figuresDownload)
// Router for sending eod figures to the api
router.post('/figures-upload', EODControllers.figuresUpload)


// Router for getting isi game types from the api
router.get('/isi-game-types-download', ISIControllers.gameTypeDownload)
// Router for deleting an isi game
router.get('/isi-game-delete/:GAMEID', ISIControllers.gameDelete)
// Router for sending new isi game types to the api
router.post('/isi-game-types-upload', ISIControllers.gameTypeUpload)


module.exports = router;