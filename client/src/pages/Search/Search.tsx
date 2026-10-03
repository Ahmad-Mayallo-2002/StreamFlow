import CategoriesFilters from "@/components/CategoriesFilters/CategoriesFilters";
import VideoCard from "@/components/VideoCard/VideoCard";
import { useGetVideos } from "@/hooks/get/useGetVideos";
import { useCategory } from "@/zustand/category";
import { useSearch } from "@/zustand/search";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Search() {
  const searchTerm = useSearch((state) => state.query);
  const category = useCategory((state) => state.category);
  const [take, setTake] = useState<number>(4);
  const { data, isSuccess } = useGetVideos(
    ["videos-search", searchTerm, `${take}`, category],
    take,
    0,
    category,
    searchTerm,
    Boolean(searchTerm),
  );

  if (!searchTerm) {
    return (
      <Box p={4}>
        <Text color="white">Type a keyword to search videos.</Text>
      </Box>
    );
  }

  return (
    <Box p={4} pt={0}>
      <CategoriesFilters />
      <Text fontSize="lg" my={2} color="white">
        Search results for: {searchTerm}
      </Text>

      {isSuccess && (
        <SimpleGrid gap={4} columns={{ base: 1, md: 2, lg: 4 }}>
          {data.data.map((video) => (
            <VideoCard key={video._id} {...video} />
          ))}

          {data.pagination.next && (
            <Button
              gridColumn={"1 / -1"}
              bgColor="var(--color-primary)"
              _hover={{ bgColor: "var(--color-primary-active)" }}
              onClick={() => setTake((prev) => prev + 4)}
            >
              Show More
            </Button>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}
