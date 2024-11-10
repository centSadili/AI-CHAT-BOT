const express = require('express')
const router = express.Router()
const aichatbotController = require('../controllers/aichatbotController')

router.post('/send-message',aichatbotController.chatAI)
router.get('/caption-image',aichatbotController.imageToText)
module.exports = router;