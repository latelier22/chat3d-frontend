import { useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useImage = () => {
  const [loading, setLoading] = useState(false);

  const generateImage = async (description) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const data = await response.json();
        const fullImageUrl = `${backendUrl}${data.imagePath}`;
        return fullImageUrl;
      } else {
        console.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateImage,
    loading,
  };
};
