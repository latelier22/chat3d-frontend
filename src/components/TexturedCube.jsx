import React, { useEffect, useState, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei"; // Importer le composant Text
import useImageStore from "../hooks/useImageStore";

const TexturedCube = ({ imageUrl, position }) => {
  const [texture, setTexture] = useState(null);
  const meshRef = useRef(); // Référence au mesh pour forcer une mise à jour du matériel
  const isSearching = useImageStore((state) => state.isSearching); // Récupérer l'état de recherche
  const [showText, setShowText] = useState(true); // État pour gérer l'affichage du texte

  const [remainingRotations, setRemainingRotations] = useState(0); // Compteur pour les rotations restantes

  useEffect(() => {
    if (imageUrl) {
      console.log("Loading texture from:", imageUrl);
      const loader = new THREE.TextureLoader();
      loader.load(imageUrl, (loadedTexture) => {
        setTexture(loadedTexture);
        setShowText(false); // Cacher le texte lorsque l'image est chargée
        if (meshRef.current) {
          meshRef.current.material.needsUpdate = true; // Forcer la mise à jour du matériel
        }
      });
    }
  }, [imageUrl]);

  useEffect(() => {
    if (!isSearching) {
      setRemainingRotations(2 * Math.PI * 2); // 2 tours complets
    }
  }, [isSearching]);

  useFrame((_, delta) => {
    if (isSearching) {
      meshRef.current.rotation.y += delta * 2; // Rotation rapide pendant la recherche
    } else if (remainingRotations > 0) {
      const rotationStep = delta * 4;
      meshRef.current.rotation.y += rotationStep; // Continuer la rotation
      setRemainingRotations((prev) => Math.max(0, prev - rotationStep));
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      {texture ? (
        <meshStandardMaterial map={texture} attach="material" />
      ) : (
        <meshStandardMaterial color="gray" attach="material" />
      )}
      {showText && (
        <>
        <Text
          position={[0, 0, 0.51]}
          rotation={[0, 0, 0]}
          fontSize={0.05}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Décrivez l'image de vos rêves
        </Text>
        <Text
          position={[0, 0, -0.51]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.05}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Décrivez l'image de vos rêves
        </Text>
        <Text
          position={[-0.51, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.05}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Décrivez l'image de vos rêves
        </Text>
        <Text
          position={[0.51, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.05}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Décrivez l'image de vos rêves
        </Text>
        <Text
          position={[0, 0.51, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.05}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Décrivez l'image de vos rêves
        </Text>
        <Text
          position={[0, -0.51, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          fontSize={0.05}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Décrivez l'image de vos rêves
        </Text>
      </>
      )}
    </mesh>
  );
};

export default TexturedCube;
