import * as microsoftTeams from "@microsoft/teams-js";
import { TeamsContextWithCredential } from "@microsoft/teamsfx-react";
import AuthContext from "core/context/AuthContext";
import { Token, UserProfile } from "core/models/AppModels";
import { jwtDecode } from "jwt-decode";
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Spinner from "shared/components/Spinner";

interface AuthProviderProps {
  cred: TeamsContextWithCredential;
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ cred, children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const isError = useMemo(() => !loading && !token, [loading, token]);

  const useAuth = true //(import.meta.env.VITE_USE_AUTH ?? "true") === "true"; //TODO aggiungere in .env
  const initialize_teams_sdk = useCallback(
    () => {
      return microsoftTeams.app.initialize()
        .then(() => {
          console.log("SDK di Microsoft Teams inizializzato correttamente.");
          return true;
        })
        .catch((error) => {
          console.log("Errore nell'inizializzazione dell'SDK di Teams: " + error.message);
          console.error("Stack dell'errore:", error.stack);
          throw new Error("Errore durante l'inizializzazione del Teams SDK.");
        });
    }, []);

  const getClientSideToken = useCallback(
    () => {
      return microsoftTeams.authentication.getAuthToken()
        .then((token) => {
          console.log("Token ottenuto: " + token);
          return token;
        })
        .catch((error) => {
          console.log("Errore nell'ottenere il token: " + error.message);
          console.error("Stack dell'errore:", error.stack);
          throw new Error("Impossibile ottenere il token di autenticazione.");
        });
    }, []);

  const decodeJwtToken = useCallback(
    (token: string) => {
      try {
        const decoded = jwtDecode<Token>(token);
        console.log("Decoded JWT Token:", decoded);
        return decoded;
      } catch (error) {
        console.error("Errore nella decodifica del token:", error);
        throw new Error("Token JWT non valido.");
      }
    }, []);

  const getUserProfile = useCallback(
    async () => {
      try {
        const token = await getClientSideToken();
        const decodedToken = decodeJwtToken(token);
        return {
          userId: decodedToken.oid || "Sconosciuto",
          userPrincipalName: decodedToken.preferred_username || "Sconosciuto",
          displayName: decodedToken.name || "Sconosciuto",
        };
      } catch (error) {
        console.error("Errore durante il recupero del profilo utente:", error);
        throw new Error("Impossibile recuperare il profilo utente.");
      }
    }, []);

  useEffect(() => {
    if (!useAuth) {
      console.log("Autenticazione disabilitata dalla variabile di ambiente.");
      setToken("mock-token");
      setLoading(false);
      return;
    }

    const authenticate = async () => {
      setLoading(true);
      try {
        await initialize_teams_sdk();
        const token = await getClientSideToken();
        const userProfile = await getUserProfile();
        setToken(token);
        setUserProfile(userProfile);
      } catch (error) {
        console.error("Errore durante l'autenticazione:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [useAuth]);

  if (loading) {
    return <Spinner />;
  }
  if(isError){
    return <div>Errore durante l'autenticazione.</div>;
  }

  return (
    <AuthContext.Provider value={{ cred, loading, token, userProfile, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
