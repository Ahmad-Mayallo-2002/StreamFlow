import CategoriesFilters from "@/components/CategoriesFilters/CategoriesFilters";
import { useGetVideos } from "@/hooks/get/useGetVideos";
import { useCategory } from "@/zustand/category";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import VideoSuggestion from "../VideoSuggestion/VideoSuggestion";

export default function VideoSuggestions() {
  const STEP = 4;
  const category = useCategory((state) => state.category);
  const [take, setTake] = useState<number>(STEP);
  const { data, isSuccess } = useGetVideos(
    ["videos", `${take}`, category],
    take,
    0,
    category,
  );
  const handleTake = () => setTake((prev) => prev + STEP);
  return (
    <Box w={{ base: "100%", lg: "360px" }}>
      <CategoriesFilters />
      {isSuccess && (
        <>
          <Box mt={2}>
            {data.data.map((video) => (
              <VideoSuggestion key={video._id} {...video} />
            ))}
            {data.pagination.next && (
              <Button
                mb={4}
                w="full"
                onClick={handleTake}
                bgColor="var(--color-primary)"
                _hover={{ bgColor: "var(--color-primary-active)" }}
              >
                Show More
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
