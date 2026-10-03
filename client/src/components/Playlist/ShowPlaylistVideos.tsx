import { useGetPlaylistVideos } from "@/hooks/get/useGetPlaylistVideos";
import { useEffect, useState } from "react";
import VideoSuggestion from "../VideoDetails/VideoSuggestion/VideoSuggestion";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { playlistVideoState } from "@/zustand/playlistVideo";

export default function ShowPlaylistVideos({ id }: { id: string }) {
  const STEP = 1;
  const [take, setTake] = useState(STEP);
  const { data, isLoading } = useGetPlaylistVideos(
    ["playlistVideos", `${take}`],
    id,
    take,
  );

  const setId = playlistVideoState((state) => state.setPlaylistVideo);

  useEffect(() => {
    if (data && data.data.length > 0) setId(data?.data[0]?._id);
  }, [setId, data]);

  if (isLoading)
    return (
      <>
        <Spinner
          borderColor="var(--color-primary)"
          borderTopColor={"transparent"}
          boxSize="30px"
          animationDuration="800ms"
        />
      </>
    );

  return (
    <>
      <Box>
        <Box mt={4}>
          {data?.data.map((video) => (
            <VideoSuggestion {...video.video} key={video._id} />
          ))}
        </Box>
        {data?.pagination.next && (
          <Button
            w="full"
            size="xs"
            bgColor="var(--color-primary)"
            _hover={{ bgColor: "var(--color-primary-active)" }}
            onClick={() => setTake((prev) => prev + STEP)}
          >
            Show More
          </Button>
        )}
      </Box>
    </>
  );
}
