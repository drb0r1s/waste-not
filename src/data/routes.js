import Home from "../pages/Home/Index";
import Household from "../pages/Household/Index";

export const routes = [
    {
        path: "/",
        element: <Home />
    },

    {
        path: "/household",
        element: <Household />
    },
];