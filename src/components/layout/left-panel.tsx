import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useCanvas } from "@/hooks/useCanvas";
import * as THREE from "three";

export const LeftPanel = () => {
  const { addToScene } = useCanvas();
  return (
    <Sidebar className="bg-[#2b2b2b]! border-r border-[#1a1a1a]">
      {/* assets panel header */}
      <SidebarHeader className="bg-[#2b2b2b]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                  {/* Logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 leading-none text-white">
                  <span className="font-medium">CAD</span>
                  <span className="">v0.0.1</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* elements panel content*/}
      <SidebarContent className="bg-[#2b2b2b]">
        <SidebarGroup className="bg-[#2b2b2b]">
          <SidebarGroupLabel className="text-white">Objects</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 p-2">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 bg-[#3d3d3d] border-[#4a4a4a] hover:bg-[#4a4a4a] text-white"
                onClick={() => {
                  const geometry = new THREE.BoxGeometry(1, 1, 1);
                  const material = new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                  });
                  const cube = new THREE.Mesh(geometry, material);
                  cube.position.set(0, 0.5, 0);
                  addToScene(cube);
                }}
              >
                <div className="w-8 h-8 border-2 border-current" />
                <span className="text-xs">Cube</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 bg-[#3d3d3d] border-[#4a4a4a] hover:bg-[#4a4a4a] text-white"
                onClick={() => {
                  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
                  const material = new THREE.MeshStandardMaterial({
                    color: 0x0000ff,
                  });
                  const cylinder = new THREE.Mesh(geometry, material);
                  cylinder.position.set(0, 0.5, 0);
                  addToScene(cylinder);
                }}
              >
                <div className="w-8 h-8 border-2 border-current rounded-sm" />
                <span className="text-xs">Cylinder</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 bg-[#3d3d3d] border-[#4a4a4a] hover:bg-[#4a4a4a] text-white"
                onClick={() => {
                  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
                  const material = new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                  });
                  const sphere = new THREE.Mesh(geometry, material);
                  sphere.position.set(0, 0.5, 0);
                  addToScene(sphere);
                }}
              >
                <div className="w-8 h-8 border-2 border-current rounded-full" />
                <span className="text-xs">Sphere</span>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* assets panel footer*/}
      <SidebarFooter className="bg-[#2b2b2b]"></SidebarFooter>
    </Sidebar>
  );
};
