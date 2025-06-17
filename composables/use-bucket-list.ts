import { useQuery } from "@tanstack/vue-query";

import { getBucket } from "~/services/service";
import type { FileMeta } from "~/services/types";

export function useBucketList() {
  return useQuery({
    queryKey: ["bucketList"],
    queryFn: getBucket,
    select: (res) =>
      res.bucketList
        .map<FileMeta>((item) => ({
          name: item,
          type: "dir"
        }))
        .sort()
  });
}
