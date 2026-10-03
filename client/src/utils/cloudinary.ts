import { endPoint } from "@/assets/assets";
import axios from "axios";
import cookie from "js-cookie";

export const getVideoUploadSignature = async () => {
  const accessToken = cookie.get("accessToken");
  const res = await axios.get(endPoint + "cloudinary/video-signature", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};
