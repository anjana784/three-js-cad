import { Header } from "./components/layout/header";
import { LeftPanel } from "./components/layout/left-panel";
import { RightPanel } from "./components/layout/right-panel";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <LeftPanel />
      <SidebarInset>
        <Header />
        <div className="h-[calc(100dvh-64px)] bg-amber-400"></div>
      </SidebarInset>
      <RightPanel />
    </SidebarProvider>
  );
}

export default App;
