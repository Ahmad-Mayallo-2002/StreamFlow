import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";

export const useDeleteVideo = (ownerId: string) =>
  useMutation({
    mutationFn: async (videoId: string) => {
      const res = await axios.delete(endPoint + `videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userVideos", ownerId] });
      client.invalidateQueries({ queryKey: ["videos"] });
      createToaster("Video deleted successfully", "Deleted", "success");
    },
    onError: (error: HttpError) =>
      createToaster(error.response.data.message, "Delete failed", "error"),
  });