import { useGetUserReact } from "@/hooks/get/useGetUserReact";
import { useGetVideoReacts } from "@/hooks/get/useGetVideoReacts";
import { useAddDislike, useAddLike } from "@/hooks/post/useAddReact";
import type { Like } from "@/interfaces/like";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

export default function LikeDislike({ videoId }: { videoId: string }) {
  const { data } = useGetVideoReacts<{ likes: number; dislikes: number }>(
    videoId,
  );
  const { data: myReact } = useGetUserReact<Like>(videoId);

  const likeMutation = useAddLike(videoId);
  const disLikeMutation = useAddDislike(videoId);
  const handleLike = () => likeMutation.mutate(videoId);
  const handleDislike = () => disLikeMutation.mutate(videoId);
  return (
    <ButtonGroup className="like-dislike" attached>
      <Button
        color={myReact?.isLiked ? "var(--color-primary)" : "#fff"}
        rounded="full"
        bgColor="var(--color-surface)"
        _hover={{ bgColor: "var(--color-surface-hover)" }}
        onClick={handleLike}
      >
        <BiSolidLike />
        {data?.likes ?? 0}
      </Button>
      <Button
        color={myReact?.isDisliked ? "var(--color-primary)" : "#fff"}
        rounded="full"
        bgColor="var(--color-surface)"
        _hover={{ bgColor: "var(--color-surface-hover)" }}
        onClick={handleDislike}
      >
        <BiSolidDislike />
        {data?.dislikes ?? 0}
      </Button>
    </ButtonGroup>
  );
}
