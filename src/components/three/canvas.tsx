import * as THREE from "three";
import { useEffect, useRef, type ReactNode } from "react";
import { useCanvas } from "@/hooks/useCanvas";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const Canvas = ({ children }: { children?: ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setContext, scene, selectedObject, setSelectedObject } = useCanvas();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Initialize Scene, Camera and Renderer
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x3d3d3d);

    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    scene.add(gridHelper);

    // Add Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add Hemisphere Light
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(hemisphereLight);

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
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;

    // Raycaster for object selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Handle click events for object selection
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Get all meshes in the scene (excluding helpers)
      const selectableObjects = scene.children.filter(
        (obj) => obj instanceof THREE.Mesh && obj.type === "Mesh"
      );

      const intersects = raycaster.intersectObjects(selectableObjects, false);

      if (intersects.length > 0) {
        setSelectedObject(intersects[0].object);
      } else {
        setSelectedObject(null);
      }
    };

    canvas.addEventListener("click", handleClick);

    // Update the context with scene, camera and renderer
    setContext({ scene, camera, renderer });

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
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
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Visual feedback for selected object
  useEffect(() => {
    if (!scene) return;

    // Reset all objects to default color
    scene.children.forEach((obj) => {
      if (
        obj instanceof THREE.Mesh &&
        obj.material instanceof THREE.MeshStandardMaterial
      ) {
        obj.material.emissive.setHex(0x000000);
      }
    });

    // Highlight selected object
    if (selectedObject && selectedObject instanceof THREE.Mesh) {
      if (selectedObject.material instanceof THREE.MeshStandardMaterial) {
        selectedObject.material.emissive.setHex(0x555500);
      }
    }
  }, [selectedObject, scene]);

  return (
    <div className="w-full h-full" ref={containerRef}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {children}
    </div>
  );
};
