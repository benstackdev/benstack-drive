import { Outlet } from "react-router";
import { ThemeProvider } from "../contexts/theme-provider";

function Root() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Outlet />
		</ThemeProvider>
	);
}

export default Root;
