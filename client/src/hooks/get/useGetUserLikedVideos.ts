import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import type { Video } from "@/interfaces/video";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserLikedVideos = (userId: string, enabled: boolean) =>
  useQuery<PaginatedData<Video>>({
    queryKey: ["userLikedVideos", userId],
    queryFn: async () => {
      const res = await axios.get(endPoint + `likes/users/${userId}/videos`, {
        params: { take: 32 },
      });
      return res.data;
    },
    enabled: enabled && Boolean(userId),
  });
