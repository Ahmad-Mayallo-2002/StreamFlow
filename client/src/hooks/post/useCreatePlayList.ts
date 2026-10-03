import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreatePlayList = () =>
  useMutation({
    mutationFn: async (data: { title: string }) => {
      const res = await axios.post(endPoint + "play-list", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      createToaster("Play list created successfully", "Done", "success");
      client.invalidateQueries({ queryKey: ["userPlayLists"] });
    },
    onError: (error: HttpError) =>
      createToaster(error.response.data.message, "Error", "error"),
  });
