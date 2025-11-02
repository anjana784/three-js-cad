import { Button } from "@/components/ui/button";
import { Move, RotateCw, Scale } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [transformMode, setTransformMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#1a1a1a] px-4 bg-[#2b2b2b]">
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">Transform Mode:</span>
        <div className="flex gap-1">
          <Button
            variant={transformMode === "translate" ? "default" : "outline"}
            size="sm"
            onClick={() => setTransformMode("translate")}
            className="gap-2"
            title="Translate (G)"
          >
            <Move className="h-4 w-4" />
            Move
          </Button>
          <Button
            variant={transformMode === "rotate" ? "default" : "outline"}
            size="sm"
            onClick={() => setTransformMode("rotate")}
            className="gap-2"
            title="Rotate (R)"
          >
            <RotateCw className="h-4 w-4" />
            Rotate
          </Button>
          <Button
            variant={transformMode === "scale" ? "default" : "outline"}
            size="sm"
            onClick={() => setTransformMode("scale")}
            className="gap-2"
            title="Scale (S)"
          >
            <Scale className="h-4 w-4" />
            Scale
          </Button>
        </div>
      </div>
    </header>
  );
};
