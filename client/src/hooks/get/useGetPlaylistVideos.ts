import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import type { PlayListVideo } from "@/interfaces/playList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPlaylistVideos = (
  queryKey: string[],
  playListId?: string,
  take?: number,
  skip?: number,
) =>
  useQuery<PaginatedData<PlayListVideo>>({
    queryKey,
    enabled: Boolean(playListId),
    queryFn: async () => {
      const params = new URLSearchParams();

      if (take !== undefined) params.append("take", String(take));
      if (skip !== undefined) params.append("skip", String(skip));

      const res = await axios.get(endPoint + `playlist-video/${playListId}`, {
        params,
      });

      return res.data;
    },
  });

export const useGetPlaylistVideoById = (
  queryKey: string[],
  playListVideoId?: string,
) =>
  useQuery<PlayListVideo>({
    queryKey,
    enabled: Boolean(playListVideoId),
    queryFn: async () => {
      const res = await axios.get(
        endPoint + `playlist-video/video/${playListVideoId}`,
      );
      return res.data;
    },
  });
