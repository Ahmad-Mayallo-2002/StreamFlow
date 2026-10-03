import CreatePlayListPopover from "@/components/VideoDetails/CreatePlayListPopover/CreatePlayListPopover";
import { useGetUserPlayLists } from "@/hooks/get/useGetUserPlayLists";
import { useDeletePlayList } from "@/hooks/delete/useDeletePlayList";
import {
  Box,
  Button,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PlaylistsTab({
  userId,
  enabled,
  isOwner,
}: {
  userId: string;
  enabled: boolean;
  isOwner: boolean;
}) {
  const STEP = 1;
  const [take, setTake] = useState(STEP);
  const { data, isPending } = useGetUserPlayLists(userId, enabled, take);
  const deletePlaylist = useDeletePlayList();
  const navigate = useNavigate();

  return (
    <Box>
      {isOwner && <CreatePlayListPopover />}
      {isPending ? (
        <Text color="white" mt={4}>
          Loading...
        </Text>
      ) : data?.data.length ? (
        <>
          <SimpleGrid mt={4} gap={4} columns={{ base: 1, md: 2, lg: 4 }}>
            {data.data.map((playlist) => (
              <Box
                key={playlist._id}
                color="white"
                bgColor="var(--color-background)"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={3}
                p={4}
                cursor="pointer"
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              >
                <Heading fontSize="lg">{playlist.title}</Heading>
                {isOwner && (
                  <IconButton
                    aria-label={`Remove playlist ${playlist.title}`}
                    size="xs"
                    rounded="full"
                    bgColor="var(--color-primary)"
                    _hover={{ bgColor: "var(--color-primary-active)" }}
                    loading={
                      deletePlaylist.isPending &&
                      deletePlaylist.variables === playlist._id
                    }
                    onClick={() => deletePlaylist.mutate(playlist._id)}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                )}
              </Box>
            ))}
          </SimpleGrid>
          {data.pagination.next && (
            <Button
              w="full"
              mt={4}
              bgColor="var(--color-primary)"
              _hover={{ bgColor: "var(--color-primary-active)" }}
              onClick={() => setTake((prev) => prev + STEP)}
            >
              {" "}
              Show More
            </Button>
          )}
        </>
      ) : (
        <Text color="white" mt={4}>
          No playlists found.
        </Text>
      )}
    </Box>
  );
}
