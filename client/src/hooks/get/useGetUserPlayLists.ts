import { endPoint } from "@/assets/assets";
import type { PaginatedData } from "@/interfaces/pagination";
import type { PlayList } from "@/interfaces/playList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserPlayLists = (
  userId: string,
  open: boolean,
  take?: number,
) =>
  useQuery<PaginatedData<PlayList>>({
    queryKey: ["userPlayLists", userId, `${take}`],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (take !== undefined) params.append("take", String(take));
      const res = await axios.get(endPoint + `play-list/users/${userId}`, {
        withCredentials: true,
        params,
      });
      return res.data;
    },
    enabled: open && Boolean(userId),
  });
