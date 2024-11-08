const express = require('express')
const router = express.Router()
const aichatbotController = require('../controllers/aichatbotController')

router.post('/send-message',aichatbotController.chatAI)

module.exports = router;