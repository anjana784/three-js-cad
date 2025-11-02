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
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <Button
              onClick={() =>
                addToScene(
                  new THREE.Mesh(
                    new THREE.BoxGeometry(),
                    new THREE.MeshStandardMaterial({ color: "green" })
                  )
                )
              }
            >
              Add cube
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* assets panel footer*/}
      <SidebarFooter className="bg-[#2b2b2b]"></SidebarFooter>
    </Sidebar>
  );
};
