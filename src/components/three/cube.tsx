import * as THREE from "three";
import { useEffect } from "react";
import { useCanvas } from "../providers/canvas-provider";

export const TestCube = () => {
  const { addToScene, removeFromScene } = useCanvas();

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    addToScene(cube);

    // Rotate the cube
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    };
    const interval = setInterval(animate, 16);

    return () => {
      clearInterval(interval);
      removeFromScene(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [addToScene, removeFromScene]);

  return null;
};
