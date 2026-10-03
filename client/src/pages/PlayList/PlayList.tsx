import ShowPlaylistVideos from "@/components/Playlist/ShowPlaylistVideos";
import VideoPlayer from "@/components/VideoDetails/VideoPlayer/VideoPlayer";
import { useGetPlaylistVideoById } from "@/hooks/get/useGetPlaylistVideos";
import { playlistVideoState } from "@/zustand/playlistVideo";
import { Box, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function PlayList() {
  const { id } = useParams();
  const playlistVideoId = playlistVideoState((state) => state.playlistVideoId);
  const { data, error, isLoading } = useGetPlaylistVideoById(
    ["playlistVideo"],
    `${playlistVideoId}`,
  );

  return (
    <Box pb={4}>
      <Container display="flex" flexDir={{ base: "column", lg: "row" }} gap={4}>
        <Box flexGrow={1}>
          <VideoPlayer
            video={data?.video}
            error={error}
            isLoading={isLoading}
            id={playlistVideoId}
          />
        </Box>

        <ShowPlaylistVideos id={`${id}`} />
      </Container>
    </Box>
  );
}
