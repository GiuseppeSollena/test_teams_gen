import { useTeamsUserCredential } from "@microsoft/teamsfx-react";

const useAppInitialization = (
) => {
    const cred = useTeamsUserCredential({
        initiateLoginEndpoint: "unkown",
        clientId: "unkown"
    });

    console.log("Credenziali utente:", cred);

    return { cred }
};

export default useAppInitialization;
