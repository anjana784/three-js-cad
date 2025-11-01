import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export const RightPanel = () => {
  return (
    <Sidebar variant="floating" side="right">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
