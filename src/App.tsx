import { Header } from "@/components/layout/header";
import { LeftPanel } from "@/components/layout/left-panel";
import { RightPanel } from "@/components/layout/right-panel";
import { CanvasProvider } from "@/components/providers/canvas-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Canvas } from "@/components/three/canvas";
import { TestCube } from "./components/three/cube";

function App() {
  return (
    <CanvasProvider>
      <SidebarProvider>
        <LeftPanel />
        <SidebarInset>
          <Header />
          <div className="h-[calc(100dvh-64px)]">
            <Canvas>
              <TestCube />
            </Canvas>
          </div>
        </SidebarInset>
        <RightPanel />
      </SidebarProvider>
    </CanvasProvider>
  );
}

export default App;
