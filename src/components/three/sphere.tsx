import * as THREE from "three";
import { useEffect } from "react";
import { useCanvas } from "../providers/canvas-provider";

export const Sphere = () => {
  const { addToScene, removeFromScene } = useCanvas();

  useEffect(() => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      metalness: 0.3,
      roughness: 0.4,
    });
    const sphere = new THREE.Mesh(geometry, material);

    // Position the sphere slightly above the grid
    sphere.position.set(2, 0.5, 0);

    addToScene(sphere);

    return () => {
      removeFromScene(sphere);
      geometry.dispose();
      material.dispose();
    };
  }, [addToScene, removeFromScene]);

  return null;
};
