import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeletePlayList = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(endPoint + `play-list/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userPlayLists"] });
      createToaster("Playlist deleted successfully", "Done", "success");
    },
    onError: (error: HttpError) =>
      createToaster(error.response.data.message, "Error", "error"),
  });
