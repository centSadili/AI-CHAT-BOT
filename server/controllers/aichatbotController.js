const express = require('express');
const dotenv = require('dotenv');
const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
dotenv.config();


const chatAI = async (req,res) =>{
    const { userInput } = req.body;
    const apiKey = process.env.GOOGLE_AI_API;
    try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userInput);
        const botResponse = await result.response;

        res.json({ message: botResponse.text() });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request' });
    }
}

const imageToText = async (req, res) => {
    try {
      const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
      const inference = new HfInference(HF_ACCESS_TOKEN);
      const model = 'Salesforce/blip-image-captioning-large';
  
      let imageBuffer;
  
      if (req.file) {
        // 🖼️ Image uploaded via form-data
        imageBuffer = req.file.buffer;
      } else if (req.body.image) {
        // 🌐 Image URL
        const response = await fetch(req.body.image);
        imageBuffer = Buffer.from(await response.arrayBuffer());
      } else {
        return res.status(400).json({ error: 'No image file or URL provided.' });
      }
  
      const result = await inference.imageToText({
        data: imageBuffer,
        model: model,
      });
  
      res.json(result);
    } catch (error) {
      console.error('Error generating caption:', error);
      res.status(500).send('Error generating caption');
    }
  };

module.exports={chatAI,imageToText}