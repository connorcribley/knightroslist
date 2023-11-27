import React from "react";
import Home from "./components/Home";
import Error from "./components/Error";
import Login from "./components/users/Login"
import Register from "./components/users/Register"
import Logout from "./components/users/Logout";
import Index from "./components/universities/Index";
import Show from "./components/universities/Show";
import New from "./components/universities/New";
import Edit from "./components/universities/Edit";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter ([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>,
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path:"register",
        element: <Register/>
    },
    {
        path:"logout",
        element: <Logout/>,
        errorElement: <Error/>
    },
    {
        path:"universities",
        element: <Index/>,
        errorElement: <Error/>
    },
    {
        path:"universities/:id",
        element: <Show/>,
        errorElement: <Error/>
    },
    {
        path:"universities/:id/edit",
        element: <Edit/>,
        errorElement: <Error/>
    },
    {
        path:"universities/new",
        element: <New/>,
        errorElement: <Error/>
    },
]);

const App = () => {

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
