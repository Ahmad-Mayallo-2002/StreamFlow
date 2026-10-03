import { Button, Icon, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { FaBookmark, FaClock } from "react-icons/fa";
import PlayListDialog from "../PlayListDialog/PlayListDialog";
import { MdPlaylistAdd } from "react-icons/md";
import { useAddToWatchLater } from "@/hooks/post/useAddToWatchLater";

export default function Save({ videoId }: { videoId: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const mutationAddToWatchLater = useAddToWatchLater();
  const handleAddToWatchLater = () => mutationAddToWatchLater.mutate(videoId);
  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            rounded="full"
            _hover={{ bgColor: "var(--color-surface-hover)" }}
            bgColor="var(--color-surface)"
          >
            <Icon size="sm">
              <FaBookmark />
            </Icon>
            Save
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content bgColor="var(--color-background)">
              <Menu.Item
                onClick={handleAddToWatchLater}
                value="watch-later"
                _hover={{ bgColor: "var(--color-surface)" }}
                color="#fff"
              >
                <Icon size="sm">
                  <FaClock />
                </Icon>
                Watch Later
              </Menu.Item>
              <Menu.Item
                onClick={() => setOpen(true)}
                value="play-list"
                _hover={{ bgColor: "var(--color-surface)" }}
                color="#fff"
              >
                <Icon size="md">
                  <MdPlaylistAdd />
                </Icon>
                Play List
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <PlayListDialog videoId={videoId} open={open} setOpen={setOpen} />
    </>
  );
}
