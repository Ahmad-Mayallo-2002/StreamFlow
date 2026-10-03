import VideoCard from "@/components/VideoCard/VideoCard";
import { useGetUserLikedVideos } from "@/hooks/get/useGetUserLikedVideos";
import { SimpleGrid, Text } from "@chakra-ui/react";

export default function LikedVideosTab({
  userId,
  enabled,
}: {
  userId: string;
  enabled: boolean;
}) {
  const likedVideos = useGetUserLikedVideos(userId, enabled);

  if (likedVideos.isPending)
    return <Text color="white">Loading liked videos...</Text>;
  if (!likedVideos.data?.data.length)
    return <Text color="white">No liked videos found.</Text>;

  return (
    <SimpleGrid p={4} gap={4} columns={{ base: 1, md: 2, lg: 4 }}>
      {likedVideos.data.data.map((video) => (
        <VideoCard key={video._id} {...video} />
      ))}
    </SimpleGrid>
  );
}
