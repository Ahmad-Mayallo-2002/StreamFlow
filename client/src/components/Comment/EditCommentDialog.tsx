import { useEditComment } from "@/hooks/patch/useEditComment";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface SetOpen {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  defaultContent: string;
}

type EdtiCommentForm = {
  content: string;
};

export default function EditCommentDialog({
  open,
  setOpen,
  id,
  defaultContent,
}: SetOpen) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<EdtiCommentForm>();
  const mutation = useEditComment(id);
  const onSubmit = (data: EdtiCommentForm) => mutation.mutate(data);
  return (
    <Dialog.Root
      role="alertdialog"
      open={open}
      size="sm"
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor="var(--color-background)">
            <Dialog.CloseTrigger asChild>
              <CloseButton _hover={{ bgColor: "transparent", color: "#fff" }} />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Edit Comment</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form
                id="content-edit"
                onSubmit={handleSubmit(onSubmit)}
                action="#"
              >
                <Field.Root invalid={!!errors.content}>
                  <Field.Label>Content</Field.Label>
                  <Textarea
                    defaultValue={defaultContent}
                    placeholder="Comment Content"
                    {...register("content", {
                      required: "Content is required",
                      minLength: {
                        value: 1,
                        message: "Minimum length is 1 character",
                      },
                      maxLength: {
                        value: 5000,
                        message: "Maximum length is 5000 character",
                      },
                    })}
                    resize="none"
                    h="150px"
                  />
                  {errors.content && (
                    <Field.ErrorText>
                      <Field.ErrorIcon />
                      {errors.content?.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                bgColor="var(--color-primary)"
                _hover={{ bgColor: "var(--color-primary-active)" }}
                type="submit"
                loading={isLoading}
                loadingText="Loading..."
                form="content-edit"
              >
                Edit
              </Button>
              <Button
                color="#fff"
                _hover={{ color: "#000" }}
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
