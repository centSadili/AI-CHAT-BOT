const express = require('express')
const router = express.Router()
const aichatbotController = require('../controllers/aichatbotController')
const upload = require("multer")({ storage: require("multer").memoryStorage() });

router.post('/send-message',aichatbotController.chatAI)
router.post('/caption-image',upload.single('image'),aichatbotController.imageToText)
module.exports = router;