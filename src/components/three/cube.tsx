import * as THREE from "three";
import { useEffect } from "react";
import { useCanvas } from "@/hooks/useCanvas";

export const Cube = () => {
  const { addToScene, removeFromScene } = useCanvas();

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      metalness: 0.3,
      roughness: 0.4,
    });
    const cube = new THREE.Mesh(geometry, material);

    // Position the cube slightly above the grid
    cube.position.y = 0.5;

    addToScene(cube);

    return () => {
      removeFromScene(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [addToScene, removeFromScene]);

  return null;
};
