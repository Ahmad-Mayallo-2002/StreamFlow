import { endPoint } from "@/assets/assets";
import type { User } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";

const accessToken = cookie.get("accessToken");

export const useGetProfile = () =>
  useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(endPoint + `profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 15,
    refetchInterval: 1000 * 60 * 15,
  });
