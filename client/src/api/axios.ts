import { localStorageService } from "@/services/local-storage";
import axios, { type AxiosResponse } from "axios";
import type { RefreshTokenResponseData } from "./types";
import { useAuthStore } from "@/stores/auth";

export const clientApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

interface ClientApiState {
  refreshTokenPromise: Promise<AxiosResponse<RefreshTokenResponseData>> | null;
}
const state: ClientApiState = {
  refreshTokenPromise: null,
};

clientApi.interceptors.request.use((request) => {
  if (request.url && request.url[request.url?.length - 1] !== "/") {
    request.url += "/";
  }

  const token = localStorageService.get("accessToken");
  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }
  return request;
});

clientApi.interceptors.response.use(undefined, async (err) => {
  if (err.response && err.response.status === 401 && !err.config.__isRetry) {
    err.config.__isRetry = true;
    if (!state.refreshTokenPromise) {
      state.refreshTokenPromise = axios.post("/token/refresh", {
        refresh: localStorageService.get("refreshToken"),
      });
    }
    const authStore = useAuthStore();
    try {
      const { data } = await state.refreshTokenPromise;
      authStore.updateAccessToken(data.access);
      return clientApi(err.config);
    } catch (err) {
      await authStore.logout();
      throw err;
    } finally {
      state.refreshTokenPromise = null;
    }
  }
  if (err.message === "Network Error") {
    throw err;
  }
  throw err;
});
