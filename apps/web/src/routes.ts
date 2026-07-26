import { createBrowserRouter } from "react-router";
import Root from "./routes/root.tsx";

const router = createBrowserRouter([
  { path: "/", Component: Root },
]);

export default router;
