import { Outlet } from "react-router";
import { authClient } from "@/lib/auth-client";
import { SidebarMain } from "./sidebar/sidebar-main";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { Welcome } from "./welcome";

function HomeLayout() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <>Loading...</>;
  if (error) return (<>Error: {error.message}</>);

  return (
    <>
      {
        session ?
          (<SidebarProvider>
            <SidebarMain />
            <SidebarInset>
              <main className="flex flex-1">
                <Outlet />
              </main>
            </SidebarInset>
          </SidebarProvider >)
          :
          <div className="flex min-h-screen flex-col justify-between">
            <Welcome />
          </div>
      }
    </>
  );
}

export default HomeLayout;