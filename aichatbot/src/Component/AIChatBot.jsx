import React, { useState } from "react";
import axios from "axios"
import { Card, Input, Button, Typography, Space } from "antd";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";


const { TextArea } = Input;
const AIChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e)=>{
    setUserInput(e.target.value)
  }
  const clearChat = () => {
    setChatHistory([]);
  };
  const sendMessage = async () =>{
    if(userInput.trim()==='') return;

    setIsLoading(true)
    try{
      const response = await axios.post("http://localhost:3000/api/send-message",{userInput},{
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response.data.message)
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message:response.data.message },
    ]);
    }catch(err){
      console.error(err)
    }finally {
      setUserInput("");
      setIsLoading(false);
  }
  }


  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>

            <Card
                className="chat-container"
                style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "16px",
                    marginBottom: "20px",
                }}
            >
                <ChatHistory chatHistory={chatHistory} />
                <Loading isLoading={isLoading} />
            </Card>

            <Space direction="vertical" style={{ width: "100%" }}>
                <TextArea
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={handleUserInput}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    disabled={isLoading}
                    style={{ borderRadius: "8px" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={sendMessage}
                        loading={isLoading}
                        style={{ borderRadius: "8px", width: "100px" }}
                    >
                        Send
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={clearChat}
                        style={{ borderRadius: "8px", width: "100px" }}
                    >
                        Clear Chat
                    </Button>
                </Space>
            </Space>
        </div>
    </div>
  )
}

export default AIChatBot
