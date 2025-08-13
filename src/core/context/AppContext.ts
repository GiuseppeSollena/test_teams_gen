import { createContext, Dispatch, SetStateAction } from "react";

interface AppContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default AppContext;