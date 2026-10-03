import { calcFileSize, endPoint } from "@/assets/assets";
import { useGetCategories } from "@/hooks/get/useGetCategories";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  createListCollection,
  Field,
  Flex,
  Heading,
  Image,
  Input,
  Portal,
  Select,
  Span,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import type { HttpError } from "@/interfaces/error";
import { useNavigate, useParams } from "react-router-dom";

interface UploadVideoForm {
  title: string;
  description: string;
  category: string;
  thumbnail: FileList;
  video: FileList;
}

export default function EditVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadVideoForm>();
  const navigate = useNavigate();

  const { data } = useGetCategories("categories?take=20");

  const { id } = useParams();

  const frameworks = createListCollection({
    items: data ? data.data.map((c) => ({ label: c.name, value: c._id })) : [],
  });

  const [video, setVideo] = useState<File>();
  const [thumbnail, setThumbnail] = useState<File>();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.patch(endPoint + `videos/${id}`, data, {
        withCredentials: true,
      });

      return res.data;
    },

    onSuccess: (res) => {
      console.log(res);
    },

    onError: (err: HttpError) => {
      console.log(err.response);
    },
  });

  const onSubmit = (data: UploadVideoForm) => {
    const formData = new FormData();

    if (data.title?.trim()) {
      formData.append("title", data.title);
    }

    if (data.description?.trim()) {
      formData.append("description", data.description);
    }

    if (data.category) {
      formData.append("category", data.category);
    }

    if (data.video?.[0]) {
      formData.append("video", data.video[0]);
    }

    if (data.thumbnail?.[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    mutation.mutate(formData);
  };
  return (
    <>
      <Box
        className="upload-video"
        // border="1px solid var(--color-surface-active)"
        mt={6}
      >
        <Container>
          <Flex px={4} alignItems="center" justifyContent="space-between">
            <Heading fontSize="2xl">Edit Video</Heading>
            <Button
              onClick={() => navigate(-1)}
              colorPalette="blue"
              size="xs"
              rounded="full"
            >
              Return to Channel
            </Button>
          </Flex>

          {/* Form Start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex p={4} gap={4} flexDir={{ base: "column", lg: "row" }}>
              <VStack flexGrow={1} gap={4}>
                {/* Title */}
                <Field.Root invalid={!!errors.title} className="video-title">
                  <Field.Label>Title</Field.Label>
                  <Input
                    borderColor="var(--color-border-subtle)"
                    placeholder="Video Title"
                    size="sm"
                    {...register("title", {
                      minLength: {
                        value: 1,
                        message: "Title must contain at least 1 character",
                      },

                      maxLength: {
                        value: 100,
                        message: "Title cannot exceed 100 characters",
                      },
                    })}
                  />
                  {errors.title && (
                    <Field.ErrorText>
                      <Field.ErrorIcon /> {errors.title.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>

                {/* Description */}
                <Field.Root
                  invalid={!!errors.description}
                  className="video-description"
                >
                  <Field.Label>
                    Description <Span fontSize="10px">(optional)</Span>
                  </Field.Label>
                  <Textarea
                    borderColor="var(--color-border-subtle)"
                    placeholder="Video Description"
                    resize="none"
                    h="150px"
                    {...register("description", {
                      validate: (value) => {
                        if (!value) return true;
                        if (value.length < 1)
                          return "Description must contain at least 1 character";
                        if (value.length > 5000)
                          return "Description cannot exceed 5000 characters";
                        return true;
                      },
                    })}
                  />{" "}
                  {errors.description && (
                    <Field.ErrorText>
                      <Field.ErrorIcon /> {errors.description.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>

                {/* Category */}
                <Select.Root
                  invalid={!!errors.category}
                  collection={frameworks}
                  size="sm"
                >
                  <Select.HiddenSelect {...register("category")} />

                  <Select.Control>
                    <Select.Trigger borderColor="var(--color-border-subtle)">
                      <Select.ValueText
                        color="#fff"
                        placeholder="Video Category"
                      />
                    </Select.Trigger>

                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>

                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item
                            color="#000"
                            item={framework}
                            key={framework.value}
                          >
                            {framework.label}

                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                  {errors.category && (
                    <Text
                      display="flex"
                      alignItems="center"
                      gap={1}
                      color="#ef4444"
                      fontSize={".75rem"}
                      fontWeight={500}
                      textAlign="start"
                    >
                      <MdError />
                      {errors.category.message}
                    </Text>
                  )}
                </Select.Root>

                {/* Button Submit */}
                <Button
                  bgColor="var(--color-primary)"
                  w="full"
                  type="submit"
                  loading={!!mutation.isPending}
                  loadingText="Loading..."
                  _hover={{ bgColor: "var(--color-primary-active)" }}
                >
                  Upload Video
                </Button>
              </VStack>

              <VStack
                flexDir={{ base: "column", md: "row", lg: "column" }}
                gap={4}
                className="video-and-thumbnail"
                w={{ base: "full", lg: "320px" }}
              >
                {/* Video */}
                <Field.Root invalid={!!errors.video}>
                  <Field.Label htmlFor="video">Video</Field.Label>
                  <Input
                    type="file"
                    id="video"
                    hidden
                    {...register("video", {
                      onChange: (ev) => setVideo(ev.target?.files?.[0]),
                      validate: {
                        isVideo: (file: FileList) => {
                          if (file[0] && !file[0].type.startsWith("video/"))
                            return "Please select a valid video file";
                          return true;
                        },
                      },
                    })}
                  />
                  <label
                    htmlFor="video"
                    style={{ display: "block", width: "100%" }}
                  >
                    <Box
                      w="full"
                      border="1px solid var(--color-border-subtle)"
                      rounded="lg"
                      cursor="pointer"
                    >
                      {video ? (
                        <Box>
                          <AspectRatio ratio={21 / 9}>
                            <video
                              controls
                              src={URL.createObjectURL(video)}
                              style={{
                                borderRadius: ".375rem .375rem 0 0",
                              }}
                            ></video>
                          </AspectRatio>
                          <Box p={2} color="var(--color-primary-light)">
                            <Text>File Name: {video.name}</Text>
                            <Text>Size: {calcFileSize(video.size)}</Text>
                          </Box>
                        </Box>
                      ) : (
                        <Heading
                          as="h4"
                          p={4}
                          bgColor="var(--color-surface)"
                          h="100px"
                          rounded="lg"
                          display="grid"
                          placeContent="center"
                        >
                          Upload Video
                        </Heading>
                      )}
                    </Box>
                  </label>
                  {errors.video && (
                    <Field.ErrorText>
                      <Field.ErrorIcon /> {errors.video.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
                {/* Thumbnail */}
                <Field.Root invalid={!!errors.thumbnail}>
                  <Field.Label htmlFor="thumbnail">Thumbnail</Field.Label>

                  <Input
                    type="file"
                    id="thumbnail"
                    hidden
                    {...register("thumbnail", {
                      onChange: (ev) => setThumbnail(ev.target?.files?.[0]),
                      validate: {
                        isImage: (file: FileList) => {
                          if (file[0] && !file[0].type.startsWith("image/"))
                            return "Please select a valid image file";
                          return true;
                        },
                      },
                    })}
                  />

                  <label
                    htmlFor="thumbnail"
                    style={{ display: "block", width: "100%" }}
                  >
                    <Box
                      w="full"
                      border="1px solid var(--color-border-subtle)"
                      rounded="lg"
                      cursor="pointer"
                    >
                      {thumbnail ? (
                        <Box>
                          <AspectRatio ratio={21 / 9}>
                            <Image
                              rounded="lg"
                              roundedBottom="none"
                              w="100%"
                              src={URL.createObjectURL(thumbnail)}
                            />
                          </AspectRatio>
                          <Box p={2} color="var(--color-primary-light)">
                            <Text>File Name: {thumbnail.name}</Text>
                            <Text>Size: {calcFileSize(thumbnail.size)}</Text>
                          </Box>
                        </Box>
                      ) : (
                        <>
                          <Heading
                            as="h4"
                            p={4}
                            bgColor="var(--color-surface)"
                            h="100px"
                            rounded="lg"
                            display="grid"
                            placeContent="center"
                          >
                            Upload Thumbnail
                          </Heading>
                        </>
                      )}
                    </Box>
                  </label>
                  {errors.thumbnail && (
                    <Field.ErrorText>
                      <Field.ErrorIcon /> {errors.thumbnail.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              </VStack>
            </Flex>
          </form>
        </Container>
      </Box>
    </>
  );
}
