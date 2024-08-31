import React, { useState } from 'react';
import useImageStore from '../hooks/useImageStore';
import axios from 'axios';
import CoqueIP12 from '../components/CoqueIP12';
import { Canvas } from "@react-three/fiber";
import TexturedCube from "../components/TexturedCube";
import { Environment, OrbitControls } from "@react-three/drei";

const ImageSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const setImageUrl = useImageStore((state) => state.setImageUrl);
  const setIsSearching = useImageStore((state) => state.setIsSearching);
  const imageUrl = useImageStore((state) => state.imageUrl);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await axios.post(`${backendUrl}/googleSearch`, { searchTerm });
      setImages(response.data.imageUrls || []);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectImage = async (imageUrl) => {
    try {
      const response = await axios.post(`${backendUrl}/downloadImage`, { imageUrl });
      const absoluteImageUrl = `${backendUrl}${response.data.imagePath}`;
      setImageUrl(absoluteImageUrl); // Mise à jour du store avec l'URL absolue
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }} className='flex flex-col'>
    <div className='h-full md:h-1/3'>
      <h1>Image Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for images..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="justify-between mr-8" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((imageUrl, index) => (
          <div
            key={index}
            onClick={() => handleSelectImage(imageUrl)}
            style={{ cursor: 'pointer', backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            className='w-24 h-24 md:w-56 md:h-56'
          ></div>
        ))}
      </div>
{/* 
      {imageUrl && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>Selected Image:</h2>
          <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Image URL: {imageUrl}</p>
        </div>
      )} */}
    
    </div>
    <div style={{ height: "50vh", width: "100vw" }}>
<Canvas shadows camera={{ position: [2, 0, 5], fov: 50 }}>
  <Environment preset="sunset" />
  <OrbitControls />
  
  <CoqueIP12 position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} scale={15}/>
</Canvas>
</div>
</div>
   
  );
};

export default ImageSearchPage;
