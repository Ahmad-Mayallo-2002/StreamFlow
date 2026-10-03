import { endPoint } from "@/assets/assets";
import type { User } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUser = (id: string) =>
  useQuery<User>({
    queryKey: ["user-channel"],
    queryFn: async () => {
      const res = await axios.get(endPoint + `users/${id}`);
      return res.data;
    },
  });
