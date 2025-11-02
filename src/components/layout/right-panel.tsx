import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useCanvas } from "@/hooks/useCanvas";
import * as THREE from "three";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const RightPanel = () => {
  const { selectedObject } = useCanvas();
  const [properties, setProperties] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  });

  useEffect(() => {
    if (selectedObject) {
      setProperties({
        position: {
          x: Number(selectedObject.position.x.toFixed(2)),
          y: Number(selectedObject.position.y.toFixed(2)),
          z: Number(selectedObject.position.z.toFixed(2)),
        },
        rotation: {
          x: Number((selectedObject.rotation.x * 180) / Math.PI).toFixed(
            2
          ) as unknown as number,
          y: Number((selectedObject.rotation.y * 180) / Math.PI).toFixed(
            2
          ) as unknown as number,
          z: Number((selectedObject.rotation.z * 180) / Math.PI).toFixed(
            2
          ) as unknown as number,
        },
        scale: {
          x: Number(selectedObject.scale.x.toFixed(2)),
          y: Number(selectedObject.scale.y.toFixed(2)),
          z: Number(selectedObject.scale.z.toFixed(2)),
        },
      });
    }
  }, [selectedObject]);

  const handlePositionChange = (axis: "x" | "y" | "z", value: string) => {
    if (!selectedObject) return;
    const numValue = parseFloat(value) || 0;
    selectedObject.position[axis] = numValue;
    setProperties((prev) => ({
      ...prev,
      position: { ...prev.position, [axis]: numValue },
    }));
  };

  const handleRotationChange = (axis: "x" | "y" | "z", value: string) => {
    if (!selectedObject) return;
    const numValue = parseFloat(value) || 0;
    selectedObject.rotation[axis] = (numValue * Math.PI) / 180;
    setProperties((prev) => ({
      ...prev,
      rotation: { ...prev.rotation, [axis]: numValue },
    }));
  };

  const handleScaleChange = (axis: "x" | "y" | "z", value: string) => {
    if (!selectedObject) return;
    const numValue = parseFloat(value) || 1;
    selectedObject.scale[axis] = numValue;
    setProperties((prev) => ({
      ...prev,
      scale: { ...prev.scale, [axis]: numValue },
    }));
  };

  const getObjectType = () => {
    if (!selectedObject) return "None";
    if (selectedObject instanceof THREE.Mesh) {
      if (selectedObject.geometry instanceof THREE.BoxGeometry) return "Cube";
      if (selectedObject.geometry instanceof THREE.SphereGeometry)
        return "Sphere";
      if (selectedObject.geometry instanceof THREE.CylinderGeometry)
        return "Cylinder";
      return "Mesh";
    }
    return selectedObject.type;
  };

  return (
    <Sidebar side="right" className="bg-[#2b2b2b]! border-l border-[#1a1a1a]">
      <SidebarHeader className="bg-[#2b2b2b] p-4">
        <h2 className="text-white font-semibold text-lg">Properties</h2>
      </SidebarHeader>
      <SidebarContent className="bg-[#2b2b2b]">
        {selectedObject ? (
          <>
            <SidebarGroup className="bg-[#2b2b2b]">
              <SidebarGroupLabel className="text-white">
                Object Info
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-4 py-2">
                <div className="space-y-2">
                  <div>
                    <Label className="text-gray-400 text-xs">Type</Label>
                    <p className="text-white text-sm">{getObjectType()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">ID</Label>
                    <p className="text-white text-sm font-mono">
                      {selectedObject.id}
                    </p>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="bg-[#2b2b2b]">
              <SidebarGroupLabel className="text-white">
                Position
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-4 py-2">
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="pos-x" className="text-gray-400 text-xs">
                      X
                    </Label>
                    <Input
                      id="pos-x"
                      type="number"
                      step="0.1"
                      value={properties.position.x}
                      onChange={(e) =>
                        handlePositionChange("x", e.target.value)
                      }
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pos-y" className="text-gray-400 text-xs">
                      Y
                    </Label>
                    <Input
                      id="pos-y"
                      type="number"
                      step="0.1"
                      value={properties.position.y}
                      onChange={(e) =>
                        handlePositionChange("y", e.target.value)
                      }
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pos-z" className="text-gray-400 text-xs">
                      Z
                    </Label>
                    <Input
                      id="pos-z"
                      type="number"
                      step="0.1"
                      value={properties.position.z}
                      onChange={(e) =>
                        handlePositionChange("z", e.target.value)
                      }
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="bg-[#2b2b2b]">
              <SidebarGroupLabel className="text-white">
                Rotation (degrees)
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-4 py-2">
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="rot-x" className="text-gray-400 text-xs">
                      X
                    </Label>
                    <Input
                      id="rot-x"
                      type="number"
                      step="5"
                      value={properties.rotation.x}
                      onChange={(e) =>
                        handleRotationChange("x", e.target.value)
                      }
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rot-y" className="text-gray-400 text-xs">
                      Y
                    </Label>
                    <Input
                      id="rot-y"
                      type="number"
                      step="5"
                      value={properties.rotation.y}
                      onChange={(e) =>
                        handleRotationChange("y", e.target.value)
                      }
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rot-z" className="text-gray-400 text-xs">
                      Z
                    </Label>
                    <Input
                      id="rot-z"
                      type="number"
                      step="5"
                      value={properties.rotation.z}
                      onChange={(e) =>
                        handleRotationChange("z", e.target.value)
                      }
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="bg-[#2b2b2b]">
              <SidebarGroupLabel className="text-white">
                Scale
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-4 py-2">
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="scale-x" className="text-gray-400 text-xs">
                      X
                    </Label>
                    <Input
                      id="scale-x"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={properties.scale.x}
                      onChange={(e) => handleScaleChange("x", e.target.value)}
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scale-y" className="text-gray-400 text-xs">
                      Y
                    </Label>
                    <Input
                      id="scale-y"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={properties.scale.y}
                      onChange={(e) => handleScaleChange("y", e.target.value)}
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scale-z" className="text-gray-400 text-xs">
                      Z
                    </Label>
                    <Input
                      id="scale-z"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={properties.scale.z}
                      onChange={(e) => handleScaleChange("z", e.target.value)}
                      className="bg-[#3d3d3d] border-[#4a4a4a] text-white"
                    />
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup className="bg-[#2b2b2b]">
            <SidebarGroupContent className="px-4 py-8 text-center">
              <p className="text-gray-400 text-sm">No object selected</p>
              <p className="text-gray-500 text-xs mt-2">
                Click on an object to view its properties
              </p>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
