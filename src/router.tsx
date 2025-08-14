import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./components/Login/Login";
import Carteiras from "./pages/Carteiras/Carteiras";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Carteiras />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
])