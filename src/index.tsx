import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthPage from "./components/auth-page/AuthPage";
import AddPage from "./components/add-page/AddPage";
import SneakersPage from "./components/sneakers-page/SneakersPage";
import SneakerPage from "./components/sneaker-page/SneakerPage";
import SignUpPage from "./components/sigup-page/SigupPage";


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "14px 22px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 800,
          color: "#fff",
          backgroundColor: "#6a6c94",
          boxShadow: "0 4px 4px 0 #0000001d",
          border: "1px solid #858585",
          textAlign: "center",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#5a5b84", // Цвет при наведении
          },
        },
      },
    },
  },
});

export default theme;


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
      element: <AddPage />,
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
    <ThemeProvider theme={theme}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </ThemeProvider>
  </React.StrictMode>
);
