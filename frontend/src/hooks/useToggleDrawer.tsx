import { useLocation, useNavigate } from "react-router-dom"


export const useToggleDrawer = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = (show: boolean, key: string, recordId?: string) => {
        if (show) {
            console.log(recordId);
            navigate(
                "?" +
                new URLSearchParams({
                    [key]: recordId ? `true-${recordId}` : "true",
                }).toString()
            );
            return toggleDrawer;
        } else {
            const queryParams = new URLSearchParams(location.search);
            queryParams.delete(key);
            navigate("?" + queryParams.toString(), { replace: true });
        }
    };
    return toggleDrawer;

}

