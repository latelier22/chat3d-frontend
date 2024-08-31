import { useEffect } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "../components/UICube";
import useImageStore from "../hooks/useImageStore"; // Importer le store Zustand
import TexturedCube from "../components/TexturedCube";
import { Environment, OrbitControls } from "@react-three/drei";

function Cube() {
  const imageUrl = useImageStore((state) => state.imageUrl); // Récupérer l'URL de l'image depuis Zustand

  useEffect(() => {
    console.log("imageUrl in CubePage:", imageUrl);
  }, [imageUrl]);

  return (
    <>
      <Loader />
      <UI />
      <div style={{ height: "100vh", width: "100vw" }}>

      <Canvas shadows camera={{ position: [0, 0, 3], fov: 30 }}>
        <Environment preset="sunset" />
        <OrbitControls />
        <TexturedCube imageUrl={imageUrl} />
      </Canvas>
      </div>
    </>
  );
}

export default Cube;
