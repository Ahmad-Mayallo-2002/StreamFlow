import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddToWatchLater = () =>
  useMutation({
    mutationFn: async (videoId: string) => {
      const res = await axios.post(
        endPoint + `watch-later/videos/${videoId}`,
        {},
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      createToaster("Video add to watch later successfully", "Done", "success");
    },
    onError: (error: HttpError) => {
      createToaster(error.response.data.message, "Error", "error");
    },
  });
