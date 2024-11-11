import React, { useState, useEffect } from 'react'
import axios from 'axios'
const ImageToText = () => {
    const [image,setImage]=useState()
    const [message,setMessage]=useState()
    const [isLoading, setIsLoading] = useState(false);
    const handleUserInput = (e)=>{
      setImage(e.target.value)
    }
    const sendImage = async() =>{
      if(image==null) return;

      setIsLoading(true)

      try {
        const response = await axios.post("http://localhost:3000/api/caption-image",{image})
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }


    

  return (
    <div>
      <label>Send Image:</label>
      <input type="text" onChange={handleUserInput}/>
      <button onClick={sendImage}>Send Image</button>
    </div>
  )
}

export default ImageToText
