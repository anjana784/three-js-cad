import { useCallback, useMemo, useState } from "react";
import { CanvasContext } from "@/contexts/canvas-context";
import type { ReactNode } from "react";
import * as THREE from "three";

export type CanvasContextState = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
};

export type CanvasContextStateActions = {
  addToScene: (obj: THREE.Object3D) => void;
  removeFromScene: (obj: THREE.Object3D) => void;
};

export type CanvasContextType = CanvasContextState &
  CanvasContextStateActions & {
    setContext: (context: Partial<CanvasContextState>) => void;
  };

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [contextState, setContextState] = useState<CanvasContextState>({
    scene: null,
    camera: null,
    renderer: null,
  });

  const { scene } = contextState;

  const addToScene = useCallback(
    (obj: THREE.Object3D) => {
      scene?.add(obj);
    },
    [scene]
  );

  const removeFromScene = useCallback(
    (obj: THREE.Object3D) => {
      scene?.remove(obj);
    },
    [scene]
  );

  const setContext = useCallback((context: Partial<CanvasContextState>) => {
    setContextState((prev) => ({ ...prev, ...context }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...contextState,
      addToScene,
      removeFromScene,
      setContext,
    }),
    [contextState, addToScene, removeFromScene, setContext]
  );

  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  );
};
