import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import SignoutButton from "../sign-out-button";

export function SidebarUser() {
  const { data: session } = authClient.useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex-1 flex justify-between items-center p-2">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid">
            <span className="text-xs md:text-sm">{session.user.name}</span>
            <span className="text-slate-500 text-xs md:text-sm">{session.user.email}</span>
          </div>
        </div>
        <SignoutButton />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}