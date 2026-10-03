import { endPoint } from "@/assets/assets";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserReact = <T>(videoId: string) =>
  useQuery({
    queryKey: ["userReact", videoId],
    queryFn: async () => {
      const res = await axios.get(endPoint + `likes/users/videos/${videoId}`, {
        withCredentials: true,
      });
      return res.data as T;
    },
  });
