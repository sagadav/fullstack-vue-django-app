export const localStorageService = {
  get(key: string) {
    const value = localStorage.getItem(key);
    if (value === null || value === "undefined") return null;
    return JSON.parse(value);
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
