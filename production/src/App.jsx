import React, { useState, useEffect } from "react";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Login from "./components/login"
import Register from "./components/register"
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter ([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "Login",
        element: <Login/>
    },
    {
        path:"Register",
        element: <Register/>
    }
]);

const App = () => {

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
