import { Link, Outlet } from "react-router";
import { authClient } from "@/lib/auth-client";
import { SidebarMain } from "./sidebar/sidebar-main";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

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
          (
            <div className="">
              <p>No session found</p>
              <Link to="/sign-in">Click here to sign in</Link>
            </div>
          )
      }
    </>
  );
}

export default HomeLayout;