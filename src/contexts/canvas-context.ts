import { createContext } from "react";
import type { CanvasContextType } from "@/components/providers/canvas-provider";

export const CanvasContext = createContext<CanvasContextType | null>(null);
