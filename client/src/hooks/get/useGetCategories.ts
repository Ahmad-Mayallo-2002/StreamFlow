import { endPoint } from "@/assets/assets";
import type { Category } from "@/interfaces/category";
import type { PaginatedData } from "@/interfaces/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCategories = (url: string) =>
  useQuery<PaginatedData<Category>>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(endPoint + url);
      return res.data;
    },
  });
