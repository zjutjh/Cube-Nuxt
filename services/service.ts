import type { GetBucket, GetFolder } from "./types";

export const getBucket = async (): Promise<GetBucket> => {
  const res = await fetch(`/api/buckets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: localStorage.getItem("key") || ""
    }
  });
  return res.json();
};

export const getFolder = async (
  bucket: string | string[],
  location: string | string[]
): Promise<GetFolder> => {
  const res = await fetch(`/api/files?bucket=${bucket}&location=${location}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: localStorage.getItem("key") || ""
    }
  });
  return res.json();
};

export const uploadFile = async (
  files: FileList,
  bucket: string | string[],
  location: string | string[],
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
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      Key: localStorage.getItem("key") || ""
    },
    body: formData
  });
  return res;
};

export const deleteFile = async (bucket: string | string[], location: string | string[]) => {
  const formData = new FormData();
  formData.append("bucket", `${bucket}`);
  formData.append("object_key", `${location}`);
  const res = await fetch(`/api/delete`, {
    method: "DELETE",
    headers: {
      Key: localStorage.getItem("key") || ""
    },
    body: formData
  });
  return res.json();
};
