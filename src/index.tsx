import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./components/auth-page/AuthPage";
import AddPage from "./components/add-page/AddPage";
import SneakersPage from "./components/sneakers-page/SneakersPage";
import SneakerPage from "./components/sneaker-page/SneakerPage";
import SignUpPage from "./components/sigup-page/SigupPage";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <AuthPage />,
    },
    {
      path: "/registration",
      element: <SignUpPage />,
    },
    {
      path: "/",
      element: <SneakersPage />,
    },
    {
      path: "/add",
      element: <AddPage />
    },
    {
      path: "/edit/:id", 
      element: <SneakerPage />,
    },
  ],
  {
    future: {
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </React.StrictMode>
);
