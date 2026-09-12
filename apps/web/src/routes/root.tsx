import { Outlet } from "react-router";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Toaster } from "@/components/ui/toast";

function Root() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Outlet />
			<Toaster />
		</ThemeProvider>
	);
}

export default Root;
