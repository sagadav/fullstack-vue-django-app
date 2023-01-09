// attempt to fetch wrapper

import { localStorageService } from "@/services/local-storage";
import { useAuthStore } from "@/stores/auth";

interface FetcherRequest extends RequestInit {
  params?: {};
  url?: string;
  body?: any;
  headers?: Record<string, string>;
}
type FetcherRequestInfo = string | FetcherRequest;

/*
  can use like:
  helper.get(id)
  helper.get({ ... })
  hepler.get(id, { ... })
*/
interface RequestHelper {
  get(request: FetcherRequestInfo): Promise<Response | any>;
  get(path: string, options: FetcherRequest): Promise<Response | any>;
  post(request: FetcherRequestInfo): Promise<Response | any>;
  post(path: string, options: FetcherRequest): Promise<Response | any>;
}

interface RequestHelperOptions {
  baseURL?: string;
  onResponseError?: () => null;
}

const API_URL = "http://127.0.0.1:8000/api";
const defaultOptions: FetcherRequest & {
  headers: Record<string, string>;
} = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

function beforeResponseSent(options: FetcherRequest) {
  const token = localStorageService.get("accessToken");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + token,
    };
  }
}

async function onResponseError(response: Response, request: FetcherRequest) {
  if (response.status === 401) {
    const authStore = useAuthStore();
    const makeRequest = requestHelper({
      onResponseError: (response) => {
        const err = new Error(response.statusText) as Error & {
          response: Response;
        };
        err.response = response;
        throw err;
      },
    });
    const { access } = await makeRequest.post("token/refresh", {
      body: {
        refresh: authStore.refreshToken,
      },
    });
    localStorageService.set("accessToken", access);
    return makeRequest.call(request);
  }

  const err = new Error(response.statusText) as Error & {
    response: Response;
  };
  err.response = response;
  throw err;
}

export function requestHelper(
  requestHelperOptions: RequestHelperOptions = {}
): RequestHelper {
  const baseURL = requestHelperOptions.baseURL || "";
  function fetcher(
    extraOptions: FetcherRequest = {},
    pathOrOptions: FetcherRequestInfo,
    options?: FetcherRequest
  ) {
    let url: string = "";
    let mergedOptions: FetcherRequest = {};
    if (options) {
      mergedOptions = {
        ...options,
      };
    }
    if (typeof pathOrOptions === "string") {
      url = pathOrOptions;
    } else {
      url = pathOrOptions?.url || "";
      mergedOptions = {
        ...pathOrOptions,
      };
    }
    mergedOptions = {
      ...defaultOptions,
      ...mergedOptions,
      ...extraOptions,
    };
    if (mergedOptions.body)
      mergedOptions.body = JSON.stringify(mergedOptions.body);

    if (!/:\/\//.test(url)) {
      url = [API_URL, baseURL, url].filter((item) => item).join("/");
    }
    if (url[url.length - 1] !== "/") url += "/";

    beforeResponseSent(mergedOptions);
    return fetch(url, mergedOptions).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      if (requestHelperOptions.onResponseError) {
        return requestHelperOptions.onResponseError(response, {
          url,
          ...mergedOptions,
        });
      } else {
        return onResponseError(response, { url, ...mergedOptions });
      }
    });
  }
  return {
    get: fetcher.bind(null, {}),
    post: fetcher.bind(null, { method: "POST" }),
    call: fetcher.bind(null, {}),
    // put: fetcher.bind(null, { method: "PUT" }),
    // delete: fetcher.bind(null, { method: "DELETE" }),
  };
}

const makeRequest = requestHelper();
