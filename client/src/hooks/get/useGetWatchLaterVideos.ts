import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import type { WatchLaterVideo } from "@/interfaces/watchLater";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserWatchLater = (enabled: boolean) =>
  useQuery<{
    _id: string;
    owner: string;
  }>({
    queryKey: ["userWatchLater"],
    enabled,
    queryFn: async () => {
      const res = await axios.get(endPoint + "watch-later/users", {
        withCredentials: true,
      });

      return res.data;
    },
  });

export const useGetWatchLaterVideos = (
  queryKey: string[],
  watchLaterId?: string,
  take?: number,
  skip?: number,
  enabled: boolean = true,
) =>
  useQuery<PaginatedData<WatchLaterVideo>>({
    queryKey,
    enabled: enabled && Boolean(watchLaterId),
    queryFn: async () => {
      const params = new URLSearchParams();

      if (take !== undefined) params.append("take", String(take));
      if (skip !== undefined) params.append("skip", String(skip));

      const res = await axios.get(
        endPoint + `watch-later-video/${watchLaterId}`,
        {
          params,
          withCredentials: true,
        },
      );

      return res.data;
    },
  });

export const useGetWatchLaterVideoById = (
  queryKey: string[],
  watchLaterVideoId?: string,
  enabled: boolean = true,
) =>
  useQuery<WatchLaterVideo>({
    queryKey,
    enabled: enabled && Boolean(watchLaterVideoId),
    queryFn: async () => {
      const res = await axios.get(
        endPoint + `watch-later-video/video/${watchLaterVideoId}`,
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
  });
