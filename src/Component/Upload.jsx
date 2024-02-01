import React, { useState } from 'react';


const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    }
  };
  return (
    <div>
    <h1>File Upload</h1>
    <input type="file" onChange={handleFileChange} accept=".pdf" />
    <button onClick={uploadFile}>Upload</button>
    <div id="message">{message}</div>
    
  </div>
  )
}

export default Upload