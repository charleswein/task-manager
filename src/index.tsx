import { createRoot } from "react-dom/client";
import App from "@/components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Shop } from "./pages";
import {Suspense} from "react";
import {Loading} from "@/components/fallback";

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element:
          <Suspense fallback={<Loading/>}>
            <About />
          </Suspense>,
      },
      {
        path: "/shop",
        element:
         <Suspense fallback={<Loading/>}><Shop /></Suspense>,
      },
    ],
  },
]);

const container = createRoot(root);

container.render(<RouterProvider router={router}/>);
