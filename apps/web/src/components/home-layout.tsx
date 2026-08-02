import { Outlet } from "react-router";
import { authClient } from "@/lib/auth-client";
import { SidebarMain } from "./sidebar/sidebar-main";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Welcome } from "./welcome";
import { HomeFooter } from "./home-footer";

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
            <main className="flex justify-center">
              <SidebarTrigger />
              <Outlet />
            </main>
          </SidebarProvider >)
          :
          <div className="flex min-h-screen flex-col justify-between">
            <Welcome />
            <HomeFooter />
          </div>
      }
    </>
  );
}

export default HomeLayout;