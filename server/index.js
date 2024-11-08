require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const aichatbotRoutes = require('./routes/aichatbotRoutes')

//middleware
app.use(express.json())
app.use(cors())


//api
app.use('/api',aichatbotRoutes)
//Global error Handler
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something went wrong!');
})

const PORT = process.env.PORT || 3006
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})