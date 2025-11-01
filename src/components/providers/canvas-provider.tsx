import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";

export type CanvasContextType = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  addToScene: (obj: THREE.Object3D) => void;
  removeFromScene: (obj: THREE.Object3D) => void;
  setContext: (ctx: Partial<CanvasContextType>) => void;
};

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  const addToScene = (obj: THREE.Object3D) => scene?.add(obj);
  const removeFromScene = (obj: THREE.Object3D) => scene?.remove(obj);

  const setContext = (ctx: Partial<CanvasContextType>) => {
    if (ctx.scene) setScene(ctx.scene);
    if (ctx.camera) setCamera(ctx.camera);
    if (ctx.renderer) setRenderer(ctx.renderer);
  };

  return (
    <CanvasContext.Provider
      value={{
        scene,
        camera,
        renderer,
        addToScene,
        removeFromScene,
        setContext,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

//eslint-disable-next-line
export const useCanvas = () => useContext(CanvasContext);
