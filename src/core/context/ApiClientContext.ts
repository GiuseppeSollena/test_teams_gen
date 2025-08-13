import { ApiRequestMethod } from 'core/models/ApiModels';
import { createContext } from 'react';

type ApiClientProps = {
    get: <T>(path: string, options?: RequestInit) => Promise<T>;
    post: <T>(path: string, body: unknown, options?: RequestInit) => Promise<T>;
    put : <T>(path: string, body: unknown, options?: RequestInit) => Promise<T>;
    del: <T>(path: string, options?: RequestInit) => Promise<T>;
    request: <T>(path: string, method?: ApiRequestMethod, options?: RequestInit, isHealth?: boolean) => Promise<T>;
    requestBlob: (path: string, method?: ApiRequestMethod, options?: RequestInit) => Promise<Blob>;
};

const ApiClientContext = createContext<ApiClientProps | undefined>(undefined);

export default ApiClientContext;