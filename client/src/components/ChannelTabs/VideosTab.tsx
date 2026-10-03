import VideoCard from "@/components/VideoCard/VideoCard";
import { useDeleteVideo } from "@/hooks/delete/useDeleteVideo";
import { useGetUserVideos } from "@/hooks/get/useGetUserVideos";
import { useVideosCounts } from "@/zustand/videosCounts";
import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideosTab({
  userId,
  enabled,
  isOwner,
}: {
  userId: string;
  enabled: boolean;
  isOwner: boolean;
}) {
  const STEP = 4;
  const [take, setTake] = useState(STEP);
  const { isPending, data } = useGetUserVideos(userId, enabled, take);
  const setVideosCounts = useVideosCounts((state) => state.setVideosCounts);
  const deleteVideo = useDeleteVideo(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setVideosCounts(data?.pagination.counts);
  }, [data, setVideosCounts]);

  if (isPending)
    return (
      <>
        <Center h="500px">
          <Spinner
            borderWidth="7.5px"
            borderColor="var(--color-primary)"
            borderTopColor="transparent"
            boxSize="100px"
            animationDuration="750ms"
          />
        </Center>
      </>
    );
  if (!data?.data.length) return <Text color="white">No videos found.</Text>;

  return (
    <>
      <SimpleGrid pb={4} gap={4} columns={{ base: 1, md: 2, lg: 4 }}>
        {data.data.map((video) => (
          <Box key={video._id}>
            <VideoCard {...video} />
            {isOwner && (
              <Flex gap={2} p={3} bgColor="var(--color-background)">
                <Button
                  flex={1}
                  size="xs"
                  onClick={() => navigate(`/videos/${video._id}/edit`)}
                  colorPalette="blue"
                >
                  Edit video
                </Button>
                <Button
                  size="xs"
                  loading={
                    deleteVideo.isPending && deleteVideo.variables === video._id
                  }
                  onClick={() => deleteVideo.mutate(video._id)}
                  bgColor="var(--color-primary)"
                  _hover={{ bgColor: "var(--color-primary-active)" }}
                >
                  Delete
                </Button>
              </Flex>
            )}
          </Box>
        ))}
      </SimpleGrid>
      {data.pagination.next && (
        <Button
          bgColor="var(--color-primary)"
          _hover={{ bgColor: "var(--color-primary-active)" }}
          mb={4}
          w="full"
          rounded="full"
          onClick={() => setTake((prev) => prev + STEP)}
        >
          Show More
        </Button>
      )}
    </>
  );
}
