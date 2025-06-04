import { useQuery } from "@tanstack/vue-query";

import { getFolderOrFile } from "~/services/service";

interface UseFolderListOptions {
  bucketName: Ref<string> | string;
}

export function useFolderList({ bucketName }: UseFolderListOptions) {
  return useQuery({
    queryKey: ["folderList", bucketName] as const,
    queryFn: ({ queryKey }) =>
      getFolderOrFile({
        bucket: queryKey[1],
        // 前端控制在 bucket 下只有一级 folder
        location: ""
      }),
    select: (res) => res.file_list.filter((item) => item.type === "dir")
  });
}
