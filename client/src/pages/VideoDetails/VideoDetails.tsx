import VideoPlayer from "@/components/VideoDetails/VideoPlayer/VideoPlayer";
import VideoSuggestions from "@/components/VideoDetails/VideoSuggestions/VideoSuggestions";
import { useGetVideo } from "@/hooks/get/useGetVideos";
import { Box, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
export default function VideoDetails() {
  const { id } = useParams();
  const {
    data: video,
    error,
    isLoading,
  } = useGetVideo(["video", `${id}`], `${id}`);
  return (
    <>
      <Box pb={4}>
        <Container
          display="flex"
          flexDir={{ base: "column", lg: "row" }}
          gap={4}
        >
          <Box flexGrow={1}>
            {/* Video Player */}
            <VideoPlayer
              video={video}
              error={error}
              isLoading={isLoading}
              id={`${id}`}
            />
          </Box>

          {/* Videos Suggestions */}
          <VideoSuggestions />
        </Container>
      </Box>
    </>
  );
}
