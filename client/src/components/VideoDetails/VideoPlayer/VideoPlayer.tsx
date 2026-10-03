import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Span,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import VideoComments from "../VideoComments/VideoComments";
import LikeDislike from "../LikeDislike/LikeDislike";
import Save from "../Save/Save";
import type { HttpError } from "@/interfaces/error";
import type { Video } from "@/interfaces/video";

interface VideoProps {
  video: NoInfer<Video> | undefined;
  error: Error | null;
  isLoading: boolean;
  id: string;
}

export default function VideoPlayer({ video, error, isLoading, id }: VideoProps) {
  const navigate = useNavigate();

  if (isLoading)
    return (
      <>
        <Center h="calc(100vh - 72px)">
          <VStack>
            <Spinner
              boxSize="80px"
              borderColor="#fff"
              borderTopColor="transparent"
              borderWidth="5px"
              animationDuration="900ms"
            />
            <Text>Loading...</Text>
          </VStack>
        </Center>
      </>
    );

  if (error)
    return (
      <>
        <Center h="calc(100vh - 72px)">
          <Heading>{(error as HttpError).response.data.message}</Heading>
        </Center>
      </>
    );

  return (
    <>
      <video
        src={video?.url}
        style={{
          borderRadius: ".75rem",
          width: "100%",
          height: "530px",
          marginTop: "1rem",
        }}
        controls
      ></video>

      <Box mt={3} className="video-info">
        <Heading fontSize="2xl" mb={4}>
          {video?.title}
        </Heading>

        <Box
          className="actions"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <Box className="channel" alignItems="center" display="flex" gap={3}>
            <Image
              onClick={() => navigate(`/library/${video?.user._id}`)}
              src={video?.user.image}
              rounded="full"
              w="50px"
              h="50px"
            />
            <Box className="user">
              <Heading fontSize="14px">{video?.user.displayName}</Heading>
              <Text color="var(--color-primary-light)" fontSize="12px">
                Subscriptions
              </Text>
            </Box>
            <Button
              bgColor="var(--color-primary)"
              _hover={{ bgColor: "var(--color-primary-active)" }}
              rounded="full"
              size="sm"
            >
              Subscribe
            </Button>
          </Box>

          <Flex alignItems="center" gap={4}>
            <Save videoId={`${video?._id}`} />
            <LikeDislike videoId={`${video?._id}`} />
          </Flex>
        </Box>

        <Box
          cursor="pointer"
          _hover={{ bgColor: "var(--color-surface-active)" }}
          bgColor="var(--color-surface-hover)"
          p={4}
          rounded="lg"
          mt={4}
        >
          <Flex alignItems="center" gap={4} fontSize="12px">
            <Span
              display="block"
              w="5px"
              h="5px"
              bgColor="#fff"
              rounded="full"
            ></Span>
            <Text>{new Date(`${video?.createdAt}`).toLocaleDateString()}</Text>
          </Flex>
          <Text color="var(--color-primary-light)">{video?.description}</Text>
        </Box>

        {/* Comments are here */}
        <VideoComments id={`${id}`} />
      </Box>
    </>
  );
}
