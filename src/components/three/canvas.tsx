import * as THREE from "three";
import { useEffect, useRef, type ReactNode } from "react";
import { useCanvas } from "../providers/canvas-provider";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const Canvas = ({ children }: { children?: ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setContext } = useCanvas();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Initialize Scene, Camera and Renderer
    const scene = new THREE.Scene();

    // Blender-style gradient background
    const topColor = new THREE.Color(0x5a5a5a); // Light gray
    const bottomColor = new THREE.Color(0x2b2b2b); // Dark gray

    // Create gradient using fog or custom shader
    // Simple approach: use solid gray color
    scene.background = new THREE.Color(0x3d3d3d); // Medium gray like Blender

    // Optional: Add grid helper like Blender
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    scene.add(gridHelper);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Pass the canvas element to the renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera movements
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2; // Prevent going below ground

    // Update the context with scene, camera and renderer
    setContext({ scene, camera, renderer });

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update(); // Required if enableDamping is true
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose(); // Cleanup controls
      renderer.dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full" ref={containerRef}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {children}
    </div>
  );
};
