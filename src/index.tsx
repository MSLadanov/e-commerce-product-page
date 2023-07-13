import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/Routes/Error/Error";
import Root from "./components/Routes/Root/Root";
import Men from "./components/Routes/Men/Men";
import Women from "./components/Routes/Women/Women";
import About from "./components/Routes/About/About";
import Contact from "./components/Routes/Contact/Contact";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "men/",
        element: <Men />,
      },
      {
        path: "women/",
        element: <Women />,
      },
      {
        path: "about/",
        element: <About />,
      },
      {
        path: "contact/",
        element: <Contact />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
