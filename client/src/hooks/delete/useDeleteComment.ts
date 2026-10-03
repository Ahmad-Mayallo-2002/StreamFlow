import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";

const accessToken = cookie.get("accessToken");

export const useDeleteComment = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(endPoint + `comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    onError: (err: HttpError) => {
      createToaster(err.response.data.message, "Error", "error");
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["videoComments"] });
      createToaster("Comment deleted successfully", "Done", "success");
    },
  });
