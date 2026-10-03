import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { MdSort } from "react-icons/md";
import VideoCreateComment from "../VideoCreateComment/VideoCreateComment";
import { useGetVideoComments } from "@/hooks/get/useGetVideoComments";
import Comment from "@/components/Comment/Comment";
import { useState } from "react";

export default function VideoComments({ id }: { id: string }) {
  const STEP = 10;
  const [take, setTake] = useState<number>(STEP);
  const [sort, setSort] = useState<string>("desc");
  const { data, isSuccess } = useGetVideoComments(
    ["videoComments", `${take}`, id, `${sort}`],
    id,
    take,
    sort,
  );
  return (
    <Box mt={4} className="comments">
      <Flex className="heading-comments" justifyContent="space-between">
        <Heading>{data?.pagination.counts} Comments</Heading>
        <Menu.Root onSelect={(details) => setSort(details.value)}>
          <Menu.Trigger asChild>
            <Button bgColor="transparent" color="var(--color-primary-light)">
              <Icon fontSize="20px">
                <MdSort />
              </Icon>
              Sort By
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content bgColor="var(--color-background)">
                <Menu.Item
                  cursor="pointer"
                  _hover={{ bgColor: "var(--color-surface)" }}
                  value="asc"
                  color="#fff"
                >
                  ASC
                </Menu.Item>
                <Menu.Item
                  _hover={{ bgColor: "var(--color-surface)" }}
                  cursor="pointer"
                  color="#fff"
                  value="desc"
                >
                  DESC
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>

      <VideoCreateComment id={`${id}`} />

      {isSuccess && (
        <>
          {data.data.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
          {data.pagination.next && (
            <Button
              bgColor="var(--color-primary)"
              _hover={{ bgColor: "var(--color-primary-active)" }}
              size="sm"
              w="full"
              mt={4}
              onClick={() => setTake((prev) => prev + STEP)}
            >
              Show More
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
