export const CLOUD_NAME = "duwziizmm";
export const UPLOAD_PRESET = "upload_unsigned_preset";
const API_KEY = "317634556962438";


interface UploadResult {
  secure_url: string;
  [key: string]: any;
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("api_key", API_KEY);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data: UploadResult = await response.json();

  if (!data.secure_url) {
    throw new Error("No se recibió una URL válida de Cloudinary");
  }

  return data.secure_url;
}
