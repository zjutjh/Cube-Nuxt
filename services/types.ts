export type FileMeta = {
  name: string;
  size: number;
  type: string;
  last_modified: string;
  url: string;
};

export interface GetFolderContentResp {
  file_list: FileMeta[];
}

export interface GetBucketResp {
  bucket_list: string[];
}
