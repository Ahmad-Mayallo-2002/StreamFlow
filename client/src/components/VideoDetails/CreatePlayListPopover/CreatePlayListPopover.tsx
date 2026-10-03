import { useCreatePlayList } from "@/hooks/post/useCreatePlayList";
import { Button, Field, Icon, Input, Popover, Portal } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

export default function CreatePlayListPopover() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  const { mutate, isPending } = useCreatePlayList();

  const onSubmit = (data: { title: string }) => mutate(data);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          w="full"
          bgColor="var(--color-primary)"
          _hover={{ bgColor: "var(--color-primary-active)" }}
          rounded="lg"
        >
          <Icon>
            <FaPlus />
          </Icon>
          Create Play List
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content bgColor="var(--color-background)">
            <Popover.Arrow
              css={{ "--arrow-background": "var(--color-background)" }}
            />
            <Popover.Body>
              <form onSubmit={handleSubmit(onSubmit)} action="#">
                <Field.Root invalid={!!errors.title}>
                  <Field.Label>Play List Title</Field.Label>
                  <Input
                    {...register("title", {
                      required: "Play list title is required",
                    })}
                    placeholder="Enter Play List Title"
                    size="sm"
                  />
                  {errors.title && (
                    <Field.ErrorText>
                      <Field.ErrorIcon />
                      {errors.title.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
                <Button
                  mt={2}
                  size="sm"
                  w="full"
                  type="submit"
                  bgColor="var(--color-primary)"
                  _hover={{ bgColor: "var(--color-primary-active)" }}
                  loading={isPending}
                  loadingText="Loading"
                >
                  Create
                </Button>
              </form>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
