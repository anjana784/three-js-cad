import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export const RightPanel = () => {
  return (
    <Sidebar side="right" className="bg-[#2b2b2b]! border-l border-[#1a1a1a]">
      <SidebarHeader className="bg-[#2b2b2b]"></SidebarHeader>
      <SidebarContent className="bg-[#2b2b2b]">
        <SidebarGroup className="bg-[#2b2b2b]"></SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
