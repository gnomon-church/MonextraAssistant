const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/say-something', controllers.saySomething);

// Router for sending eof figures to the api
router.get('/figures-upload', controllers.figuresUpload)

module.exports = router;