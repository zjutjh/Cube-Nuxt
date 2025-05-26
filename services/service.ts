import type { GetBucketResp, GetFolderContentResp } from "./types";

export const getBucket = () => {
  return request<GetBucketResp>({
    url: "/api/buckets",
    method: "GET"
  });
};

export const getFolderOrFile = async (
  bucket: string,
  location: string
): Promise<GetFolderContentResp> => {
  return request({
    url: "/api/files",
    method: "GET",
    params: { bucket, location }
  });
};

export const uploadFile = async (
  files: FileList,
  bucket: string,
  location: string,
  convet_webp: boolean,
  use_uuid: boolean
) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("bucket", `${bucket}`);
  formData.append("location", `${location}`);
  formData.append("convet_webp", String(convet_webp));
  formData.append("use_uuid", String(use_uuid));

  return request({
    url: "/api/upload",
    method: "POST",
    data: formData
  });
};

export const deleteFile = async (bucket: string | string[], location: string | string[]) => {
  const formData = new FormData();
  formData.append("bucket", `${bucket}`);
  formData.append("object_key", `${location}`);

  return request({
    url: "/api/delete",
    method: "DELETE",
    data: formData
  });
};
