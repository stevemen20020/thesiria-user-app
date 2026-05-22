import { useAuthStore } from "../../store/auth/Auth.store";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  useFormData?: boolean;
}

class APIClient {
  private baseURL: string;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(options?: RequestOptions): HeadersInit {
    const headers: Record<string, string> = {};

    if (!options?.useFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (!options?.skipAuth) {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const state = useAuthStore.getState();
        const refreshToken = state.refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await fetch(`${this.baseURL}/auth/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
          throw new Error("Refresh failed");
        }

        const data = await response.json();
        const newAccessToken = data.access;
        const newRefreshToken = data.refresh || refreshToken;

        if (state.user) {
          state.setAuth(state.user, newAccessToken, newRefreshToken);
        }

        return newAccessToken;
      } catch (error) {
        useAuthStore.getState().clearAuth();
        // window.location.href = "/login";
        throw error;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const config: RequestInit = {
        ...options,
        headers: this.getHeaders(options),
        signal: controller.signal,
      };

      let response = await fetch(url, config);

      if (
        response.status === 401 &&
        !options.skipAuth &&
        !endpoint.includes("login") &&
        !endpoint.includes("refresh")
      ) {
        await this.refreshAccessToken();

        const newConfig: RequestInit = {
          ...options,
          headers: this.getHeaders(options),
          signal: controller.signal,
        };

        response = await fetch(url, newConfig);
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          detail: "An error occurred",
        }));

        throw {
          status: response.status,
          data: error,
        };
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
    } catch (error: any) {
      if (error?.name === "AbortError") {
        throw {
          status: 504,
          message: "Network timeout",
        };
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private isFile(value: any): boolean {
    return value instanceof File || value instanceof Blob || false;
  }

  private objectToFormData(
    obj: Record<string, any>,
    formData = new FormData(),
    parentKey?: string,
  ): FormData {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value === null || value === undefined) {
        continue;
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (this.isFile(item)) {
            formData.append(`${formKey}[${index}]`, item);
          } else if (typeof item === "object" && item !== null) {
            this.objectToFormData(item, formData, `${formKey}[${index}]`);
          } else {
            formData.append(`${formKey}[${index}]`, item.toString());
          }
        });
      } else if (this.isFile(value)) {
        formData.append(formKey, value);
      } else if (typeof value === "object") {
        this.objectToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value.toString());
      }
    }
    return formData;
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    let body: BodyInit | undefined;
    let useFormData = options?.useFormData ?? false;

    if (data instanceof FormData) {
      body = data;
      useFormData = true;
    } else if (data && useFormData) {
      body = this.objectToFormData(data as Record<string, any>);
    } else if (data) {
      body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body,
      useFormData,
    });
  }

  put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    let body: BodyInit | undefined;
    const useFormData = options?.useFormData ?? false;

    if (data && useFormData) {
      body = this.objectToFormData(data as Record<string, any>);
    } else if (data) {
      body = JSON.stringify(data);
    }

    const { ...restOptions } = options ?? {};

    return this.request<T>(endpoint, {
      ...restOptions,
      method: "PUT",
      body,
    });
  }

  patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    let body: BodyInit | undefined;
    const useFormData = options?.useFormData ?? false;

    if (data && useFormData) {
      body = this.objectToFormData(data as Record<string, any>);
    } else if (data) {
      body = JSON.stringify(data);
    }

    const { ...restOptions } = options ?? {};

    return this.request<T>(endpoint, {
      ...restOptions,
      method: "PATCH",
      body,
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new APIClient(BASE_URL);
