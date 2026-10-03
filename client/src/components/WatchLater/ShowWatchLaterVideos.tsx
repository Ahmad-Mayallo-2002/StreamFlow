import {
  useGetUserWatchLater,
  useGetWatchLaterVideos,
} from "@/hooks/get/useGetWatchLaterVideos";
import { watchLaterVideoState } from "@/zustand/watchLaterVideo";
import { Box, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ShowWatchLaterVideos({
  enabled,
}: {
  enabled: boolean;
}) {
  const { data: watchLaterData, isPending: isWatchLaterPending } =
    useGetUserWatchLater(enabled);
  const watchLaterId = watchLaterData?._id;
  const { data, isPending } = useGetWatchLaterVideos(
    ["watchLaterVideos", `${watchLaterId ?? ""}`],
    watchLaterId,
    10,
    0,
    enabled,
  );

  const selectedId = watchLaterVideoState((state) => state.watchLaterVideoId);
  const setSelectedId = watchLaterVideoState(
    (state) => state.setWatchLaterVideo,
  );

  useEffect(() => {
    if (data && data.data.length > 0) {
      const firstId = data.data[0]._id;
      const isSelectedValid = data.data.some((item) => item._id === selectedId);

      if (!selectedId || !isSelectedValid) {
        setSelectedId(firstId);
      }
    }
  }, [data, selectedId, setSelectedId]);

  const watchLaterVideos = data?.data ?? [];

  if (isWatchLaterPending || isPending) {
    return (
      <Box w={{ base: "100%", lg: "360px" }}>
        <Box mt={2} display="flex" justifyContent="center" py={8}>
          <Spinner color="var(--color-primary)" />
        </Box>
      </Box>
    );
  }

  return (
    <Box w={{ base: "100%", lg: "360px" }}>
      <Box mt={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Heading fontSize="lg">Watch later</Heading>
          <Text fontSize="sm" color="var(--color-primary-light)">
            {data?.pagination?.counts ?? watchLaterVideos.length} videos
          </Text>
        </Box>

        {watchLaterVideos.map((watchLaterVideo) => {
          const video = watchLaterVideo.video;

          if (!video || typeof video === "string") return null;

          const isSelected = selectedId === watchLaterVideo._id;

          return (
            <Flex
              key={watchLaterVideo._id}
              gap={2}
              cursor="pointer"
              mb={4}
              p={2}
              rounded="lg"
              bgColor={
                isSelected ? "var(--color-surface-hover)" : "transparent"
              }
              border={
                isSelected
                  ? "1px solid var(--color-primary)"
                  : "1px solid transparent"
              }
              onClick={() => setSelectedId(watchLaterVideo._id)}
            >
              <Image
                w="150px"
                h="100%"
                src={video.thumbnail.url}
                alt={video.title}
                rounded="lg"
              />
              <Box>
                <Heading fontSize="xl" color="#fff">
                  {video.title}
                </Heading>
                <Text fontSize="10px" color="var(--color-primary-light)">
                  {video.user.displayName}
                </Text>
                <Text
                  color="var(--color-primary-light)"
                  fontSize="10px"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  {new Date(video.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
