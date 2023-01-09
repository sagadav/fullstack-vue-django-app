import { defineStore } from "pinia";
import { requestHelper } from "@/api/request";
import { localStorageService } from "@/services/local-storage";
import { clientApi } from "@/api/axios";
import type { LoginResponseData } from "@/api/types";
import { parseJwt } from "@/utils/parse-jwt";
import router from "@/router";

interface User {
  username?: string;
  userId?: number;
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isLoggedIn: Boolean(localStorageService.get("accessToken")),
      accessToken: localStorageService.get("accessToken"),
      refreshToken: localStorageService.get("refreshToken"),
      user: localStorageService.get("user") as User,
    };
  },
  actions: {
    updateAccessToken(token?: string) {
      this.accessToken = token;
      if (token) {
        localStorageService.set("accessToken", token);
        const tokenData = parseJwt(this.accessToken);
        this.user = {
          username: tokenData.username,
          userId: tokenData.user_id,
        };
        localStorageService.set("user", this.user);
      } else {
        localStorageService.remove("accessToken");
        this.user = {};
        localStorageService.remove("user");
      }
    },
    updateRefreshToken(token?: string) {
      this.refreshToken = token;
      if (token) {
        localStorageService.set("refreshToken", token);
      } else {
        localStorageService.remove("refreshToken");
      }
    },
    updateTokens({ access, refresh }: { access?: string; refresh?: string }) {
      this.updateAccessToken(access);
      this.updateRefreshToken(refresh);
    },
    async login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      const { data } = await clientApi.post<LoginResponseData>("login", {
        username,
        password,
      });
      const { access, refresh } = data;
      this.updateTokens({ access, refresh });
      this.isLoggedIn = true;

      router.push({ name: "home" });
    },
    logout() {
      this.isLoggedIn = false;
      this.updateTokens({
        access: "",
        refresh: "",
      });
    },
  },
});
