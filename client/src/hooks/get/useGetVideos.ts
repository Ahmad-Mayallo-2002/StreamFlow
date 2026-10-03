import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import type { Video } from "@/interfaces/video";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetVideos = (
  queryKey: string[],
  take?: number,
  skip?: number,
  category?: string,
  search?: string,
  enabled: boolean = true,
) =>
  useQuery<PaginatedData<Video>>({
    queryKey,
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams();

      if (take !== undefined) params.append("take", String(take));
      if (skip !== undefined) params.append("skip", String(skip));
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      const res = await axios.get(endPoint + "videos", {
        params,
      });
      return res.data;
    },
  });

export const useGetVideo = (
  queryKey: string[],
  id: string,
  enabled: boolean = true,
) =>
  useQuery<Video>({
    queryKey,
    enabled: Boolean(id) && enabled,
    queryFn: async () => {
      const res = await axios.get(endPoint + `videos/${id}`);
      return res.data;
    },
  });
