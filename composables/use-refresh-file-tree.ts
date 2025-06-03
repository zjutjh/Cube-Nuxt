import { useQueryClient } from "@tanstack/vue-query";

interface RefreshFileTreeOptions {
  bucketList?: boolean;
  fileList?: boolean;
  folderList?: boolean;
}

export function useRefreshFileTree() {
  const queryClient = useQueryClient();
  /** { bucketList: true, fileList: true } 类似这样填 不填默认不触发*/
  const refreshFileTree = (key: RefreshFileTreeOptions) => {
    const promises: Promise<unknown>[] = [];

    Object.entries(key).forEach(([queryKey, isRefreshed]) => {
      if (isRefreshed) {
        promises.push(queryClient.invalidateQueries({ queryKey: [queryKey] }));
      }
    });

    return Promise.all(promises);
  };

  return { refreshFileTree };
}
