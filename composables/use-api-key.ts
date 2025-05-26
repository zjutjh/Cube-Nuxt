import { useStorage } from "@vueuse/core";

export const API_KEY_STORAGE_KEY = "@zjutjh/cube/api-key";

export const useApiKey = () => {
  const apiKey = useStorage(API_KEY_STORAGE_KEY, "");

  return apiKey;
};
