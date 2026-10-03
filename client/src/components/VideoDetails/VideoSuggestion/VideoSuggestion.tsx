import type { Video } from "@/interfaces/video";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function VideoSuggestion({
  _id,
  thumbnail,
  title,
  createdAt,
  user,
}: Video) {
  const navigate = useNavigate();
  const handleNavigateToVideo = () => navigate(`/videos/${_id}`);
  return (
    <Flex gap={2} cursor="pointer" onClick={handleNavigateToVideo} mb={4}>
      <Image w="150px" h="100%" src={thumbnail.url} alt={title} rounded="lg" />
      <Box>
        <Heading fontSize="xl" color="#fff">
          {title}
        </Heading>
        <Text fontSize="10px" color="var(--color-primary-light)">
          {user.displayName}
        </Text>
        <Text
          color="var(--color-primary-light)"
          fontSize="10px"
          display="flex"
          alignItems="center"
          gap={2}
        >
          {new Date(createdAt).toLocaleDateString()}{" "}
        </Text>
      </Box>
    </Flex>
  );
}
