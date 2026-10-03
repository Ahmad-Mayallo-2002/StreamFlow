import ShowWatchLaterVideos from "@/components/WatchLater/ShowWatchLaterVideos";
import VideoPlayer from "@/components/VideoDetails/VideoPlayer/VideoPlayer";
import { useGetWatchLaterVideoById } from "@/hooks/get/useGetWatchLaterVideos";
import { watchLaterVideoState } from "@/zustand/watchLaterVideo";
import { Box, Container } from "@chakra-ui/react";

export default function WatchLater({ enabled }: { enabled: boolean }) {
  const watchLaterVideoId = watchLaterVideoState(
    (state) => state.watchLaterVideoId,
  );

  const { data, error, isPending } = useGetWatchLaterVideoById(
    ["watchLaterVideo", `${watchLaterVideoId}`],
    `${watchLaterVideoId}`,
    enabled,
  );

  return (
    <Box pb={4}>
      <Container display="flex" flexDir={{ base: "column", lg: "row" }} gap={4}>
        <Box flexGrow={1}>
          <VideoPlayer
            video={data?.video}
            error={error}
            isLoading={isPending}
            id={watchLaterVideoId}
          />
        </Box>

        <ShowWatchLaterVideos enabled={enabled} />
      </Container>
    </Box>
  );
}
