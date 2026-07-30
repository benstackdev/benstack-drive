import { Outlet } from "react-router";
import { ThemeProvider } from "../contexts/theme-provider";
import AuthProvider from "../contexts/auth-provider";
import AuthVerifier from "../components/auth-verifier";

function Root() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<AuthVerifier>
					<Outlet />
				</AuthVerifier>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default Root;
