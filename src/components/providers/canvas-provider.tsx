import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
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

  const addToScene = useCallback(
    (obj: THREE.Object3D) => scene?.add(obj),
    [scene]
  );
  const removeFromScene = useCallback(
    (obj: THREE.Object3D) => scene?.remove(obj),
    [scene]
  );

  const setContext = useCallback((ctx: Partial<CanvasContextType>) => {
    if (ctx.scene) setScene(ctx.scene);
    if (ctx.camera) setCamera(ctx.camera);
    if (ctx.renderer) setRenderer(ctx.renderer);
  }, []);

  const contextValue = useMemo(
    () => ({
      scene,
      camera,
      renderer,
      addToScene,
      removeFromScene,
      setContext,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scene, camera, renderer, addToScene, removeFromScene]
  );

  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
