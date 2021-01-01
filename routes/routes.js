const express = require('express');
const router = express.Router();

const EODGetControllers = require('../controllers/EODGetControllers');
const EODPostControllers = require('../controllers/EODPostControllers');
const ISIGetControllers = require('../controllers/ISIGetControllers');
const ISIPostControllers = require('../controllers/ISIPostControllers');


// Router for getting eod figures by date and store from the api
router.get('/figures-download/:Store/:Date', EODGetControllers.figuresDownload)
// Router for sending eod figures to the api
router.post('/figures-upload', EODPostControllers.figuresUpload)


// Router for getting isi game types from the api
router.get('/isi-game-types-download', ISIGetControllers.gameTypeDownload)
// Router for deleting an isi game
router.get('/isi-game-delete/:GAMEID', ISIGetControllers.gameDelete)
//Router for getting information on an isi game type
router.get('/isi-game-details/:GAMEID', ISIGetControllers.gameDetails)

// Router for sending new isi game types to the api
router.post('/isi-game-types-upload', ISIPostControllers.gameTypeUpload)
// Router for sending new shipment details to the api
router.post('/shipment-details-upload', ISIPostControllers.shipmentDetailsUpload)
// Router for receiving an isi shipment 
router.post('/receive-isi-shipment/:SHIPMENTID', ISIPostControllers.receiveShipment)


module.exports = router;