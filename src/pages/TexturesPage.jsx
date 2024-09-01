import React, { useState } from 'react';
import useTextureStore from '../hooks/useTextureStore';
import axios from 'axios';
import { Avatar } from '../components/AvatarTextures';
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from 'leva';

const TexturesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    images,
    textures,
    selectedTexture,
    setIsSearching,
    setImages,
    setSelectedTexture,
    setModelTexture,
  } = useTextureStore(state => state);

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
    if (!selectedTexture) {
      alert("Please select a texture first.");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/downloadImage`, { imageUrl });
      const absoluteImageUrl = `${backendUrl}${response.data.imagePath}`;
      setModelTexture(selectedTexture, absoluteImageUrl); // Appliquer la texture au matériau sélectionné
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Utilisation de Leva pour sélectionner une texture
  useControls({
    Texture: {
      value: selectedTexture || '',
      options: textures,
      onChange: (value) => setSelectedTexture(value),
    },
  }, [textures]);

  return (
    <div style={{ height: "100vh", width: "100vw" }} className='flex'>
      <div>
        <h1>Image Search</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for images..."
        />
        <button onClick={handleSearch}>Search</button>

        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Array.isArray(images) && images.length > 0 ? (
            images.map((imageUrl, index) => (
              <div
                key={index}
                onClick={() => handleSelectImage(imageUrl)}
                style={{ cursor: 'pointer', width: '150px', height: '150px', backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
            ))
          ) : (
            <p>No images found.</p>
          )}
        </div>
      </div>
      <Canvas shadows camera={{ position: [2, 0, 5], fov: 50 }}>
        <Environment preset="sunset" />
        <OrbitControls />
        <Avatar position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default TexturesPage;
