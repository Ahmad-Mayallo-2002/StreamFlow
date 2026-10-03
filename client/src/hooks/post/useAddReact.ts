import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddLike = (videoId: string) =>
  useMutation({
    onError: (error: HttpError) => {
      createToaster(error.response.data.message, "Error", "error");
    },
    onSuccess: (data: string) => {
      createToaster(data, "Done", "success");
      client.invalidateQueries({
        queryKey: ["userReact", videoId],
      });
      client.invalidateQueries({ queryKey: ["videoReacts", videoId] });
    },
    mutationFn: async (videoId: string) => {
      const res = await axios.post(
        endPoint + `likes/videos/${videoId}/like`,
        {},
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
  });

export const useAddDislike = (videoId: string) =>
  useMutation({
    onError: (error: HttpError) => {
      createToaster(error.response.data.message, "Error", "error");
    },
    onSuccess: (data: string) => {
      createToaster(data, "Done", "success");
      client.invalidateQueries({ queryKey: ["userReact", videoId] });
      client.invalidateQueries({ queryKey: ["videoReacts", videoId] });
    },
    mutationFn: async (videoId: string) => {
      const res = await axios.post(
        endPoint + `likes/videos/${videoId}/dislike`,
        {},
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
  });
