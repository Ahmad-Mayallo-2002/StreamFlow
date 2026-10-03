import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";

interface UpdateVideoInput {
  id: string;
  body: {
    title: string;
    description: string;
    category: string;
  };
}

export const useUpdateVideo = (videoId: string, ownerId: string) =>
  useMutation({
    mutationFn: async ({ id, body }: UpdateVideoInput) => {
      const res = await axios.patch(endPoint + `videos/${id}`, body, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["video", videoId] });
      client.invalidateQueries({ queryKey: ["userVideos", ownerId] });
      client.invalidateQueries({ queryKey: ["videos"] });
      createToaster("Video updated successfully", "Saved", "success");
    },
    onError: (error: HttpError) =>
      createToaster(error.response.data.message, "Update failed", "error"),
  });