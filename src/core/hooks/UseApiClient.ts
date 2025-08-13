import { useContext } from "react";
import ApiClientContext from "../context/ApiClientContext";

const useApiClient = () => {
    const context = useContext(ApiClientContext);
    
    if (!context) {
        throw new Error("useApiClient must be used within a ApiProvider");
    }

    return context;
}

export default useApiClient;