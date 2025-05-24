/** get folder接口的data */
export interface GetFolder {
  msg: string;
  code: number;
  data: {
    file_list: fileList[];
  };
}

export type fileList = {
  name: string;
  size: number;
  type: string;
  last_modified: string;
  url: string;
};

export interface GetBucket {
  msg: string;
  code: number;
  data: {
    bucket_list: string[];
  };
}
