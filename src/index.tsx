import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserLayout from './Layouts/UserLayout/UserLayout';
import Login from './Auth/Login/Login';
import Signup from './Auth/SignUp/Signup';
import { AuthProvider } from './AuthProvider/AuthContext';
// import AuthProvider from './AuthProvider/AuthProvider';



const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout></UserLayout>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
    ]
  },
]);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
);


reportWebVitals();
