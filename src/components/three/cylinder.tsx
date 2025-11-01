import * as THREE from "three";
import { useEffect } from "react";
import { useCanvas } from "../providers/canvas-provider";

export const Cylinder = () => {
  const { addToScene, removeFromScene } = useCanvas();

  useEffect(() => {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4a90e2,
      metalness: 0.3,
      roughness: 0.4,
    });
    const cylinder = new THREE.Mesh(geometry, material);

    // Position the cylinder slightly above the grid
    cylinder.position.set(-2, 0.5, 0);

    addToScene(cylinder);

    return () => {
      removeFromScene(cylinder);
      geometry.dispose();
      material.dispose();
    };
  }, [addToScene, removeFromScene]);

  return null;
};