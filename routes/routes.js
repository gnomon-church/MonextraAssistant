const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// Router for getting eod figures by date and store from the api
router.get('/figures-download/:Store/:Date', controllers.figuresDownload)

// Router for sending eod figures to the api
router.post('/figures-upload', controllers.figuresUpload)

module.exports = router;