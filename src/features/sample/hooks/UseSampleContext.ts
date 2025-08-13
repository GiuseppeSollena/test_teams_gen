import { useContext } from "react";
import SampleContext from "../context/SampleContext";


const useSampleContext = () => {
    const context = useContext(SampleContext);
    if (context === undefined) {
        throw new Error('useSampleContext must be used within a SampleProvider');
    }
    return context;
}

export default useSampleContext;