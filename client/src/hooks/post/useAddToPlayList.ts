import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddToPlayList = () =>
  useMutation({
    mutationFn: async ({
      videoId,
      playlistId,
    }: {
      videoId: string;
      playlistId: string;
    }) => {
      const res = await axios.post(
        endPoint + `playlist-video/${videoId}/${playlistId}`,
        {},
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
    onSuccess: () =>
      createToaster("Added to playlist successfully", "Done", "success"),
    onError: (error: HttpError) =>
      createToaster(error.response.data.message, "Error", "error"),
  });
