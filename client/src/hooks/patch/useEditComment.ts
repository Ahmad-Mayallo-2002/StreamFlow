import { createToaster, endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { client } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useEditComment = (id: string) =>
  useMutation({
    mutationFn: async (body: { content: string }) => {
      const res = await axios.patch(endPoint + `comments/${id}`, body, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      createToaster("Content updated successfully", "Success", "success");
      client.invalidateQueries({
        queryKey: ["videoComments"],
      });
    },
    onError: (err: HttpError) => {
      createToaster(err.response.data.message, "Error", "error");
      console.log(err.response.data);
    },
  });
