import { Button, Flex, Image, Input } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import cookie from "js-cookie";
import axios from "axios";
import { endPoint } from "@/assets/assets";
import type { HttpError } from "@/interfaces/error";
import { useForm } from "react-hook-form";
import { useGetProfile } from "@/hooks/get/useGetProfile";
import { client } from "@/main";

interface CreateComment {
  content: string;
}

export default function VideoCreateComment({ id }: { id: string }) {
  const { register, handleSubmit } = useForm<CreateComment>();
  const accessToken = cookie.get("accessToken");

  const { data } = useGetProfile();

  const mutation = useMutation({
    onSuccess: () => {
      console.log("Done");
      client.invalidateQueries({ queryKey: ["videoComments"] });
    },
    onError: (error: HttpError) => {
      console.log(error.response);
    },
    mutationFn: async (input: CreateComment) => {
      const res = await axios.post(endPoint + `comments/videos/${id}`, input, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    mutationKey: ["createComment"],
  });

  const onSubmit = (data: CreateComment) => mutation.mutate(data);

  return (
    <Flex className="create-comment" mt={3} gap={4} alignItems="center">
      {data && <Image src={data?.image} w="50px" h="50px" rounded="full" />}
      <Input
        size="sm"
        placeholder="Add a Comment"
        borderColor="var(--color-border-subtle)"
        _placeholder={{ color: "var(--color-primary-light)" }}
        rounded="md"
        {...register("content", {
          required: 'Content is required',
          minLength: {
            value: 1,
            message: "Minimum length is 1 character",
          },
          maxLength: {
            value: 5000,
            message: "Maximum length is 5000 character",
          },
        })}
      />
      <Button
        bgColor="var(--color-primary)"
        _hover={{ bgColor: "var(--color-primary-active)" }}
        size="sm"
        rounded="full"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        create
      </Button>
    </Flex>
  );
}
