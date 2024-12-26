import Home from "../pages/home/Index";
import Household from "../pages/household/Index";
import Invite from "../pages/invite/Index";

export const routes = [
    {
        path: "/",
        element: <Home />
    },

    {
        path: "/household",
        element: <Household />
    },

    {
        path: "/invite",
        element: <Invite />
    }
];