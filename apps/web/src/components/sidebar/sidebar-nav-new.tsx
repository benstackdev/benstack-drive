import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { NewFileDialog } from "./sidebar-new-file";
import { NewDirDialog } from "./sidebar-new-dir";

export function SidebarNavNew() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex items-center gap-2">
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <NewFileDialog />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NewDirDialog />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}