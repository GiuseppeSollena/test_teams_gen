import React, { PropsWithChildren, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import ApiClientContext from "../context/ApiClientContext";
import { ApiRequestMethod, ApiResponse } from "core/models/ApiModels";

const ApiClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const getHeaders = useCallback(
    async (extraHeaders: HeadersInit = {}): Promise<HeadersInit> => {

      return {
        correlationID: uuidv4(),
        "Content-Type": "application/json",
        ...extraHeaders,
      };
    },
    []
  );

  const request = useCallback(
    async <T,>(
      path: string,
      method: ApiRequestMethod = "GET",
      options: RequestInit = {},
      isHealth = false
    ): Promise<T> => {
      const headers = await getHeaders(options.headers);
      let apiBaseUrl = "TODO"; //TODO: implementare l'URL di base dell'API
      if (isHealth) {
        apiBaseUrl = apiBaseUrl.replace("/api/v1", "");
      }
      const url = apiBaseUrl + path;
      const response = await fetch(url, {
        method,
        headers,
        ...options,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw { status: response.status, response: errorResponse };
      }

      const json: ApiResponse<T> = await response.json();
      // Supponendo che la risposta abbia una proprietà "data" contenente il payload
      return json.data;
    },
    [getHeaders]
  );

  const requestBlob = useCallback(
    async (
      path: string,
      method: ApiRequestMethod = "GET",
      options: RequestInit = {}
    ): Promise<Blob> => {
      const headers = await getHeaders(options.headers);
      const url = `TODO${path}`; //TODO: implementare l'URL di base dell'API

      const response = await fetch(url, {
        method,
        headers,
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw { status: response.status, response: errorText };
      }

      return await response.blob();
    },
    [getHeaders]
  );

  const get = useCallback(
    async <T,>(path: string, options: RequestInit = {}): Promise<T> =>
      request<T>(path, "GET", options),
    [request]
  );

  const post = useCallback(
    async <T,>(
      path: string,
      body: unknown = {},
      options: RequestInit = {}
    ): Promise<T> => {
      const mergedOptions: RequestInit = {
        ...options,
        body: JSON.stringify(body),
      };
      return request<T>(path, "POST", mergedOptions);
    },
    [request]
  );

  const put = useCallback(
    async <T,>(
      path: string,
      body: unknown = {},
      options: RequestInit = {}
    ): Promise<T> => {
      const mergedOptions: RequestInit = {
        ...options,
        body: JSON.stringify(body),
      };
      return request<T>(path, "PUT", mergedOptions);
    },
    [request]
  );

  // const patch = useCallback(
  //     async <T,>(
  //         path: string,
  //         body: unknown = {},
  //         options: RequestInit = {}
  //     ): Promise<T> => {
  //         const mergedOptions: RequestInit = {
  //             ...options,
  //             body: JSON.stringify(body),
  //         };
  //         return request<T>(path, "PATCH", mergedOptions);
  //     },
  //     [request]
  // );

  const del = useCallback(
    async <T,>(path: string, options: RequestInit = {}): Promise<T> =>
      request<T>(path, "DELETE", options),
    [request]
  );

  return (
    <ApiClientContext.Provider
      value={{ get, post, put, del, request, requestBlob }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};

export default ApiClientProvider;

