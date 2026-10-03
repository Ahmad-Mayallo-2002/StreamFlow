import CategoriesFilters from "@/components/CategoriesFilters/CategoriesFilters";
import VideoCard from "@/components/VideoCard/VideoCard";
import { useGetVideos } from "@/hooks/get/useGetVideos";
import { useCategory } from "@/zustand/category";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

export default function Videos() {
  const STEP = 4;
  const [take, setTake] = useState<number>(STEP);
  const category = useCategory((state) => state.category);
  const { data, isSuccess } = useGetVideos(
    ["videos", category, `${take}`],
    take,
    0,
    category,
  );
  return (
    <>
      <Box>
        <CategoriesFilters />
        {isSuccess && (
          <>
            <SimpleGrid p={4} gap={4} columns={{ base: 1, md: 2, lg: 4 }}>
              {data.data.map((video) => (
                <VideoCard key={video._id} {...video} />
              ))}
              {data.pagination.next && (
                <Button
                  onClick={() => setTake((prev) => prev + STEP)}
                  gridColumn={"1 / -1"}
                  colorPalette="red"
                  w="full"
                  bgColor="var(--color-primary)"
                  _hover={{ bgColor: "var(--color-primary-active)" }}
                >
                  Show More
                </Button>
              )}
            </SimpleGrid>
          </>
        )}
      </Box>
    </>
  );
}
