import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Trash2 } from "lucide-react";

export function SidebarNavOptions() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex items-center gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Trash2 />
              Trash
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}