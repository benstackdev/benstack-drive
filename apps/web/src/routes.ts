import { createBrowserRouter } from "react-router";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home }
    ]
  },
]);

export default router;
