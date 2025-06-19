type FileType = "dir" | "image";

export type FileMeta = {
  name: string;
  type?: FileType;
  size?: number;
  lastModified?: string;
  objectKey?: string;
};

export interface GetFolderContentResp {
  fileList: FileMeta[];
}

export interface GetBucketResp {
  bucketList: string[];
}

export interface GetFileListReq {
  bucket: string;
  location: string;
}
