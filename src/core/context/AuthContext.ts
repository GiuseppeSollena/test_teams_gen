import { createContext } from "react";
import { UserProfile } from "core/models/AppModels";
import { TeamsContextWithCredential } from "@microsoft/teamsfx-react";

interface AuthContextProps {
  cred: TeamsContextWithCredential;
  loading: boolean;
  token: string | null;
  userProfile: UserProfile | null;
  isError: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;