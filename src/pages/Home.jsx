import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience";
import { UI } from "../components/UI";
import { useImage } from "../hooks/useImage"; // Importer useImage

function Home() {
  const { imageUrl } = useImage(); // Récupérer l'URL de l'image

  return (
    <>
      <Loader />
      <Leva hidden/>
      <UI />
      <div style={{ height: "100vh", width: "100vw" }}>

      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience imageUrl={imageUrl} /> {/* Passer l'URL de l'image */}
      </Canvas>
      </div>
    </>
  );
}

export default Home;

