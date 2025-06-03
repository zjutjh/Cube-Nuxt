export const downloadFile = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);

  link.href = objectUrl;
  link.download = fileName;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
};
