type FileType = "dir" | "image";

export type FileMeta = {
  name: string;
  type?: FileType;
  size?: number;
  last_modified?: string;
  object_key?: string;
};

export interface GetFolderContentResp {
  file_list: FileMeta[];
}

export interface GetBucketResp {
  bucket_list: string[];
}

export interface GetFileListReq {
  bucket: string;
  location: string;
}
