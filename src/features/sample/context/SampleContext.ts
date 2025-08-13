import { createContext } from "react";
import { SampleTable } from "../models/SampleModels";

interface SampleContextProps {
    data? : SampleTable[];
    isLoading: boolean;
}

const SampleContext = createContext<SampleContextProps | undefined>(undefined);

export default SampleContext;