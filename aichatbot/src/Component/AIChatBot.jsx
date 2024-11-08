import React, { useState } from "react";
import axios from "axios"
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";



const AIChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botMessage,setBotMessage] = useState("");

  const handleUserInput = (e)=>{
    setUserInput(e.target.value)
  }
  const sendMessage = async () =>{
    if(userInput.trim()==='') return;

    setIsLoading(true)
    try{
      const response = await axios.post("http://localhost:3000/api/send-message",{userInput})
      console.log(response.data.message)
      setBotMessage(response.data.message)
    }catch(err){
      console.error(err)
    }
  }


  return (
    <div>
      <label>Input Message:</label>
      <input type="text" onChange={handleUserInput}/>
      <button onClick={sendMessage}>Send</button>
      <p>{botMessage}</p>
    </div>
  )
}

export default AIChatBot
