import { useRef } from "react";
import { useImage } from "../hooks/useImage";
import useImageStore from "../hooks/useImageStore";

export const UI = ({ hidden, ...props }) => {
  const imageInput = useRef();
  const setImageUrl = useImageStore((state) => state.setImageUrl);
  const setIsSearching = useImageStore((state) => state.setIsSearching); // Ajouter ceci
  const { generateImage, loading: imageLoading } = useImage();

  const sendImageRequest = () => {
    const description = imageInput.current.value;
    if (!imageLoading && description) {
      setIsSearching(true); // Indiquer que la recherche est en cours
      generateImage(description).then((url) => {
        setImageUrl(url);
        setIsSearching(false); // Arrêter la recherche une fois terminé
      });
      imageInput.current.value = "";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
      <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
        <h1 className="font-black text-xl">My Cube</h1>
        <p>Describe an image to generate it!</p>
      </div>
      <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto mt-4">
        <input
          className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
          placeholder="Describe an image..."
          ref={imageInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendImageRequest();
            }
          }}
        />
        <button
          disabled={imageLoading}
          onClick={sendImageRequest}
          className={`bg-blue-500 hover:bg-blue-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
            imageLoading ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          Generate
        </button>
      </div>
    </div>
  );
};
