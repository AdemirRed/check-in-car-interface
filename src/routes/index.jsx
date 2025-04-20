import { createBrowserRouter } from "react-router-dom";
import { ForgotPassword } from "../containers/ForgotPassword";
import Home from "../containers/Home";
import { Login } from "../containers/Login";
import { Register } from "../containers/Register";

export const router = createBrowserRouter([
    {
        path: "/Home",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/esqueci-senha",
        element: <ForgotPassword />,
    },
    {
        path: "/cadastro",
        element: <Register />,
    },
    
]);
    