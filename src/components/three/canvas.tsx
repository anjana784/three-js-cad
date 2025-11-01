import * as THREE from "three";
import { useEffect, useRef, type ReactNode } from "react";
import { useCanvas } from "../providers/canvas-provider";

export const Canvas = ({ children }: { children?: ReactNode }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { setContext } = useCanvas();

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Scene, Camera and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Update the context with scene, camera and renderer
    setContext({ scene, camera, renderer });

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;

      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement.parentElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [setContext]);

  return (
    <div className="w-full h-full" ref={mountRef}>
      {children}
    </div>
  );
};
