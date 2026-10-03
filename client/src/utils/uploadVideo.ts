import type { CloudinaryUploadResponse } from "@/interfaces/uploadVideo";
import { getVideoUploadSignature } from "./cloudinary";
import axios from "axios";

export async function uploadVideo(file: File) {
  try {
    const { signature, timestamp, publicId, apiKey, cloudName } =
      await getVideoUploadSignature();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("public_id", publicId);

    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      formData,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
