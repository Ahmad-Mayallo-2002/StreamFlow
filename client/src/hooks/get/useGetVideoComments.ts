import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Comment } from "@/interfaces/comment";

export const useGetVideoComments = (
  queryKey: string[],
  videoId: string,
  take: number = 10,
  sort: string = 'desc',
  skip: number = 0,
) =>
  useQuery<PaginatedData<Comment>>({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (take !== undefined) params.append("take", String(take));
      if (skip !== undefined) params.append("skip", String(skip));
      if (sort !== undefined) params.append("sort", sort);
      const res = await axios.get(endPoint + `comments/videos/${videoId}`, {
        params,
      });
      return res.data;
    },
  });
