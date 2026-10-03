import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import type { Video } from "@/interfaces/video";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserVideos = (
  userId: string,
  enabled: boolean,
  take: number = 4,
) =>
  useQuery<PaginatedData<Video>>({
    queryKey: ["userVideos", userId, take],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (take !== undefined) params.append("take", `${take}`);
      const res = await axios.get(endPoint + `videos/users/${userId}`, {
        params,
      });
      return res.data;
    },
    enabled: enabled && Boolean(userId),
  });
