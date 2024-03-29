import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import  store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';
import ErrorPage from "./components/Routes/Error/Error";
import Root from "./components/Routes/Root/Root";
import Men from "./components/Routes/Men/Men";
import Women from "./components/Routes/Women/Women";
import About from "./components/Routes/About/About";
import Contact from "./components/Routes/Contact/Contact";
import { SneakerPage } from "./components/SneakerPage/SneakerPage";
import { Orders } from "./components/Routes/Orders/Orders";
import { Cart } from "./components/Routes/Cart/Cart";
import { SignUp } from "./components/Routes/SignUp/SignUp";
import { CreateSneaker } from "./components/Routes/CreateSneaker/CreateSneaker";
import { UsersOrders } from "./components/Routes/UsersOrders/UsersOrders";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

let persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/men" />,
      },
      {
        path: "men/",
        element: <Men />,
      },
      {
        path: "women/",
        element: <Women />,
      },
      {
        path: "orders/",
        element: <Orders />,
      },
      {
        path: "cart/",
        element: <Cart />,
      },
      {
        path: "about/",
        element: <About />,
      },
      {
        path: "contact/",
        element: <Contact />,
      },
      {
        path: "signup/",
        element: <SignUp />,
      },
      {
        path: ":sex/sneaker/:id",
        element: <SneakerPage />,
      },
      {
        path: "/sneaker/create",
        element: <CreateSneaker/>,
      },
      {
        path: "orders/all",
        element: <UsersOrders/>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
