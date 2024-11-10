const express = require('express');
const dotenv = require('dotenv');
const { HfInference } = require('@huggingface/inference');

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

const imageToText =  async (req,res)=>{
    try {

        const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
        const inference = new HfInference(HF_ACCESS_TOKEN);
        const model = 'Salesforce/blip-image-captioning-large';
        const imageURL = req.query.url || 
        'https://ausmed-images.s3.ap-southeast-2.amazonaws.com/ausmed.com/ausmed-articles/20220325_body_1.jpg';

        const response = await fetch(imageURL);
        const imageBlob = await response.blob();

        const result = await inference.imageToText({
            data: imageBlob,
            model: model,
        });

        res.json(result);
    } catch (error) {
        console.error('Error generating caption:', error);
        res.status(500).send('Error generating caption');
    }
}

module.exports={chatAI,imageToText}