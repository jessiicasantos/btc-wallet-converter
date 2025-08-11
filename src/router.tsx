import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./components/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
])