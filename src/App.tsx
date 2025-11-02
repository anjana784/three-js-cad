import { Header } from "@/components/layout/header";
import { LeftPanel } from "@/components/layout/left-panel";
import { RightPanel } from "@/components/layout/right-panel";
import { CanvasProvider } from "@/components/providers/canvas-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Canvas } from "@/components/three/canvas";
// import { Cube } from "./components/three/cube";
// import { Sphere } from "./components/three/sphere";
// import { Cylinder } from "./components/three/cylinder";

function App() {
  return (
    <CanvasProvider>
      <SidebarProvider>
        <LeftPanel />
        <SidebarInset className="bg-[#3d3d3d]">
          <Header />
          <div className="h-[calc(100dvh-64px)]">
            <Canvas>
              {/* <Cube />
              <Sphere />
              <Cylinder /> */}
            </Canvas>
          </div>
        </SidebarInset>
        <RightPanel />
      </SidebarProvider>
    </CanvasProvider>
  );
}

export default App;
