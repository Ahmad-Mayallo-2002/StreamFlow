import { endPoint } from "@/assets/assets";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetVideoReacts = <T>(videoId: string) =>
  useQuery({
    queryKey: ["videoReacts", videoId],
    queryFn: async () => {
      const res = await axios.get(endPoint + `likes/videos/${videoId}`);
      return res.data as T;
    },
  });
