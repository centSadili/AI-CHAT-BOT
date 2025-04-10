import React, { useState } from 'react';
import axios from 'axios';

const ImageToText = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(''); // Clear URL if file is selected
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageFile(null); // Clear file if URL is typed
  };

  const sendImage = async () => {
    if (!imageFile && !imageUrl) return alert("Please provide an image file or URL.");

    setIsLoading(true);
    setMessage('');

    try {
      let response;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        response = await axios.post('http://localhost:3000/api/caption-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post('http://localhost:3000/api/caption-image', {
          image: imageUrl,
        });
      }

      setMessage(response.data.generated_text || 'No caption found');
    } catch (error) {
      console.error(error);
      setMessage('Failed to get caption.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Image to Caption</h2>

      <div>
        <label>Select Image File:</label><br />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Or Enter Image URL:</label><br />
        <input type="text" value={imageUrl} onChange={handleUrlChange} placeholder="https://..." style={{ width: '100%' }} />
      </div>

      <button onClick={sendImage} disabled={isLoading} style={{ marginTop: 20 }}>
        {isLoading ? 'Processing...' : 'Send Image'}
      </button>

      {message && (
        <div style={{ marginTop: 20 }}>
          <strong>Caption:</strong>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ImageToText;
