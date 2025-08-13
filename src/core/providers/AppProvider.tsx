import { FC, ReactNode, useState, useCallback } from "react";
import { FluentProvider } from "@fluentui/react-components";
import { QUERY_CLIENT } from "core/configs/AppConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import AppContext from "core/context/AppContext";
import { I18nextProvider } from "react-i18next";
import i18n from "core/i18n/i18n";
import { getTheme } from "../styles/theme";
import ApiClientProvider from "core/providers/ApiClientProvider";
import useAppInitialization from "core/hooks/UseAppInitialization";
import AuthProvider from "./AuthProvider";
import ModalProvider from "core/providers/ModalProvider";
interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { cred } = useAppInitialization();
  const selectedTheme = useCallback(
    () => getTheme(cred?.themeString),
    [cred?.themeString]
  );

  return (
    <AuthProvider cred={cred}>
      <ApiClientProvider>
        <AppContext.Provider value={{ loading, setLoading }}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={QUERY_CLIENT}>
              <FluentProvider theme={selectedTheme()}>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </FluentProvider>
            </QueryClientProvider>
          </I18nextProvider>
        </AppContext.Provider>
      </ApiClientProvider>
    </AuthProvider>
  );
};

export default AppProvider;
