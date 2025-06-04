import {
  QueryCache,
  QueryClient,
  type QueryClientConfig,
  VueQueryPlugin
} from "@tanstack/vue-query";

import { defineNuxtPlugin } from "#imports";

const ONE_SECOND = 1 * 1000;

const globalQueryClientConfig: QueryClientConfig = {
  queryCache: new QueryCache({
    onError: (err) => console.error(err)
  }),
  defaultOptions: {
    queries: {
      retry: 2,
      // 缓存生效时间
      staleTime: 30 * ONE_SECOND
    }
  }
};

export default defineNuxtPlugin((nuxt) => {
  const queryClient = new QueryClient(globalQueryClientConfig);

  nuxt.vueApp.use(VueQueryPlugin, { queryClient });
});
