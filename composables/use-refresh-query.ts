import { useQueryClient } from "@tanstack/vue-query";

type QuerySelection = "all" | "fileList" | "folderList" | "bucketList";

export function useRefreshQuery() {
  const queryClient = useQueryClient();

  /**  可选刷新: "all" | "fileList" | "folderList" | "bucketList" 如果想只刷新两个 就类似["fileList", "folderList"] */
  const refreshQuery = (key: QuerySelection | QuerySelection[]) => {
    if (Array.isArray(key)) {
      return Promise.all(key.map((k) => queryClient.invalidateQueries({ queryKey: [k] })));
    }

    if (key === "all") {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["folderList"] }),
        queryClient.invalidateQueries({ queryKey: ["bucketList"] }),
        queryClient.invalidateQueries({ queryKey: ["fileList"] })
      ]);
    }

    return queryClient.invalidateQueries({ queryKey: [key] });
  };

  return { refreshQuery };
}
