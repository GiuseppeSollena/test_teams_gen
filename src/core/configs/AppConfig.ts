import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const QUERY_CLIENT = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Numero di tentativi in caso di errore
            refetchOnWindowFocus: false, // Non fare refetch automaticamente al focus della finestra
        },
        mutations: {
            retry: 1, // Numero di tentativi in caso di errore
        },
    },
    queryCache: new QueryCache({
        onError: (error: any) => {
            console.error(error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: any) => {
            console.error(error);
        },
    }),
});