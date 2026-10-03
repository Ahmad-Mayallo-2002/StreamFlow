import { useGetUserPlayLists } from "@/hooks/get/useGetUserPlayLists";
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import cookie from "js-cookie";
import CreatePlayListPopover from "../CreatePlayListPopover/CreatePlayListPopover";
import { useAddToPlayList } from "@/hooks/post/useAddToPlayList";

interface DialogOptions {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  videoId: string;
}

export default function PlayListDialog({
  open,
  setOpen,
  videoId,
}: DialogOptions) {
  const handleClose = () => setOpen(false);
  const STEP: number = 2;
  const [take, setTake] = useState<number>(STEP);
  const { data } = useGetUserPlayLists(cookie.get("id")!, open, take);
  const { mutate } = useAddToPlayList();
  return (
    <Dialog.Root open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor="var(--color-background)">
            <Dialog.Header>
              <Dialog.Title>Play List</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <CreatePlayListPopover />
              {data && (
                <>
                  {data.data.map((playlist) => (
                    <Text
                      mt={4}
                      bgColor="var(--color-surface)"
                      p={4}
                      rounded="lg"
                      key={playlist._id}
                      cursor="pointer"
                      onClick={() =>
                        mutate({ playlistId: playlist._id, videoId })
                      }
                    >
                      {playlist.title}
                    </Text>
                  ))}
                  {data.pagination.next && (
                    <Button
                      mt={4}
                      w="full"
                      size="sm"
                      bgColor="var(--color-primary)"
                      _hover={{ bgColor: "var(--color-primary-active)" }}
                      onClick={() => setTake((prev) => prev + STEP)}
                    >
                      Show More
                    </Button>
                  )}
                </>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  color="#fff"
                  _hover={{ color: "#000" }}
                  variant="outline"
                  onClick={handleClose}
                  rounded="full"
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="#fff"
                onClick={handleClose}
                _hover={{ bgColor: "transparent" }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
