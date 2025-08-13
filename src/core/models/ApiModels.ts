export interface ApiResponse<T> {
  data: T;
  code: number;
  message: string | null;
}

export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";