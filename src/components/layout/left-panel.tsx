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

export const LeftPanel = () => {
  return (
    <Sidebar variant="floating">
      {/* assets panel header */}
      <SidebarHeader>
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
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">CAD</span>
                  <span className="">v0.0.1</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* elements panel content*/}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Elements</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* assets panel footer*/}
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
