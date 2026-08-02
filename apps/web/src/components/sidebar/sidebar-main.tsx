import { Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { HardDrive } from "lucide-react";
import { Link } from "react-router";
import { SidebarUser } from "./sidebar-user";
import { SidebarNavNew } from "./sidebar-nav-new";
import { SidebarNavOptions } from "./sidebar-nav-options";

export function SidebarMain() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row gap-4 items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link to="/" className="flex-1 flex px-4 justify-start items-center mx-auto gap-2">
                <HardDrive className="" />
                <span className="font-semibold text-lg">BenStack Drive</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <Separator />
        <SidebarNavNew />
        <Separator />
        <SidebarNavOptions />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}