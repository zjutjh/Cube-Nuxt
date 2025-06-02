import type { GetBucketResp, GetFileListReq, GetFolderContentResp } from "./types";
const getBucket = () => {
  return request<GetBucketResp>({
    url: "/api/buckets",
    method: "GET"
  });
};

const getFolderOrFile = async ({
  bucket,
  location
}: GetFileListReq): Promise<GetFolderContentResp> => {
  return request({
    url: "/api/files",
    method: "GET",
    params: { bucket, location }
  });
};

const uploadFile = async (formData: FormData) => {
  return await request({
    url: "/api/upload",
    method: "POST",
    data: formData
  });
};

const deleteFile = async (bucket: string, location: string) => {
  const formData = new FormData();
  formData.append("bucket", `${bucket}`);
  formData.append("object_key", `${location}`);

  return request({
    url: "/api/delete",
    method: "DELETE",
    data: formData
  });
};

export { deleteFile, getBucket, getFolderOrFile, uploadFile };
