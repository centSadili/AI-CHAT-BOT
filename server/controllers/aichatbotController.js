const express = require('express');
const router = express.Router();
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
        const model = 'nlpconnect/vit-gpt2-image-captioning';
        const imageURL = req.query.url || 'https://scontent.fmnl8-6.fna.fbcdn.net/v/t39.30808-6/465774656_8681388785272501_5022670114446324643_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeHs_-2YUXNSDESiV2qzAmiK7okL3cZmQ7ruiQvdxmZDumezs7PCq-n8nGa8rlKNiBhV1hZkUy0mk1cFLEsHSVig&_nc_ohc=OMNGtLCrvrMQ7kNvgFYSeLo&_nc_zt=23&_nc_ht=scontent.fmnl8-6.fna&_nc_gid=A6AUbTvlvET11iGUVkFc6MO&oh=00_AYDmy3m7gksg4Ejf2Lr5b1MBGmeCOxlO3TBvJIvQ-NLvHQ&oe=67363BE6';

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