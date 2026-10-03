import { Box, Heading, Image, Span, Text } from "@chakra-ui/react";
import "./VideoCard.css";
import type { Video } from "@/interfaces/video";
import { useNavigate } from "react-router-dom";

export default function VideoCard({
  _id,
  createdAt,
  title,
  user,
  thumbnail,
}: Video) {
  const navigate = useNavigate();
  const handleNavigateToVideo = () => navigate(`/videos/${_id}`);
  return (
    <Box
      className="video-card"
      cursor="pointer"
      bgColor="var(--color-background)"
      rounded="lg"
      onClick={handleNavigateToVideo}
    >
      <Box
        rounded="lg"
        roundedBottom="0"
        overflow="hidden"
        w="100%"
        h="160px"
        className="thumbnail-container"
      >
        <Image
          src={thumbnail.url}
          alt=""
          h="100%"
          bgColor="var(--primary)"
          w="full"
          transition=".25s ease"
        />
      </Box>

      <Box className="body" gap={2} display="flex" p={4}>
        <Image src={user.image} w="35px" h="35px" rounded="full" />

        <Box color="#fff" className="info">
          <Heading
            transition=".25s ease"
            fontSize="xl"
            overflowX="hidden"
            textOverflow="ellipsis"
            w="175px"
            whiteSpace="nowrap"
            mb={2}
          >
            {title}
          </Heading>
          <Text fontSize="12px" color="var(--color-primary-light)">
            {user.displayName}
          </Text>
          <Text
            display="flex"
            alignItems="center"
            gap={4}
            fontSize="12px"
            color="var(--color-primary-light)"
          >
            <Span>{new Date(createdAt).toLocaleDateString()}</Span>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
