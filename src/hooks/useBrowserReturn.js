import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useBrowserReturn = () => {
    const location = useLocation();
    
    useEffect(() => {
        browserReturn();
        window.addEventListener("popstate", browserReturn);

        return () => {
            window.removeEventListener("popstate", browserReturn);
        }
    }, [location]);

    function browserReturn() {
        window.history.pushState(null, document.title, window.location.href);
    }
}