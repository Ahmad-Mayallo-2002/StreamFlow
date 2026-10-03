import type { Comment } from "@/interfaces/comment";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  Portal,
  Span,
  Text,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import cookie from "js-cookie";
import { useDeleteComment } from "@/hooks/delete/useDeleteComment";
import { useState } from "react";
import EditCommentDialog from "./EditCommentDialog";
import { useNavigate } from "react-router-dom";

export default function Comment({ author, createdAt, content, _id }: Comment) {
  const id = cookie.get("id");
  const deleteComment = useDeleteComment();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <Box className="comment-box" display="flex" mt={4} gap={4}>
        <Image
          src={author.image}
          alt={author.displayName}
          onClick={() => navigate(`/library/${author._id}`)}
          w="50px"
          h="50px"
          rounded="full"
        />
        <Box className="comment-info" flexGrow={1}>
          <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            className="heading"
          >
            <Flex alignItems="center">
              <Span me={4}>{author.displayName}</Span>
              <Span>{new Date(createdAt).toLocaleDateString()}</Span>
            </Flex>
            {id === author._id && (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <IconButton bgColor="transparent" size="sm">
                    <HiDotsVertical />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content bgColor="var(--color-background)">
                      <Menu.Item
                        _hover={{ bgColor: "var(--color-surface)" }}
                        value="edit"
                        color="#fff"
                        onClick={() => setOpen(true)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        _hover={{ bgColor: "var(--color-surface)" }}
                        value="delete"
                        color="#fff"
                        onClick={() => deleteComment.mutate(_id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
          </HStack>
          <Text>{content}</Text>
        </Box>
      </Box>
      {open && (
        <EditCommentDialog
          id={_id}
          open={open}
          setOpen={setOpen}
          defaultContent={content}
        />
      )}
    </>
  );
}
