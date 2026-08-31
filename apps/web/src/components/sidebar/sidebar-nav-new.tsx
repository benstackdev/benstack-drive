import { FilePlusCorner, FolderPlus } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NewFileDialog } from "./sidebar-new-file";

export function SidebarNavNew() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex items-center gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <NewFileDialog />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FolderPlus />
              New Folder
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}