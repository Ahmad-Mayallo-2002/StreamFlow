import { useGetUser } from "@/hooks/get/useGetUser";
import LikedVideosTab from "../../components/ChannelTabs/LikedVideosTab";
import PlaylistsTab from "../../components/ChannelTabs/PlaylistsTab";
import UploadVideo from "../../components/ChannelTabs/UploadVideo";
import VideosTab from "../../components/ChannelTabs/VideosTab";
import type { HttpError } from "@/interfaces/error";
import {
  Box,
  Container,
  Heading,
  Image,
  SkeletonCircle,
  Span,
  Tabs,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";
import { useState } from "react";
import { useVideosCounts } from "@/zustand/videosCounts";
import { tabsTriggers } from "@/assets/assets";
import WatchLater from "../WatchLater/WatchLater";

export default function Library() {
  const { id } = useParams();
  const userId = cookie.get("id");
  const profileId = id ?? "";
  const [activeTab, setActiveTab] = useState("videos");
  const videosCounts = useVideosCounts((state) => state.videosCounts);
  const { data, error, isPending } = useGetUser(`${id}`);

  if (error) return <div>{(error as HttpError).response?.data.message}</div>;

  return (
    <>
      <Box w="full">
        <Container>
          <Box className="channel-info" w="full">
            <Box
              className="header"
              as="header"
              display="flex"
              mt={6}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box display="flex" gap={4}>
                {isPending ? (
                  <SkeletonCircle
                    rounded="full"
                    boxSize="50px"
                    variant="pulse"
                  />
                ) : (
                  <Image
                    src={data?.image}
                    alt=""
                    rounded="full"
                    boxSize="50px"
                  />
                )}
                <Box className="info" color="#fff">
                  <Heading fontSize="30px">{data?.displayName}</Heading>
                  <Span>{videosCounts} Videos</Span>
                </Box>
              </Box>
            </Box>

            <Tabs.Root
              value={activeTab}
              onValueChange={(details) => setActiveTab(details.value)}
            >
              <Tabs.List>
                {tabsTriggers.map((tab, index) => (
                  <Tabs.Trigger
                    _selected={{
                      color: "var(--color-primary)",
                    }}
                    _before={{ bgColor: "var(--color-primary)" }}
                    color="#fff"
                    value={tab.value}
                    key={index}
                  >
                    {tab.name}
                  </Tabs.Trigger>
                ))}
                <Tabs.Trigger
                  _selected={{
                    color: "var(--color-primary)",
                  }}
                  _before={{ bgColor: "var(--color-primary)" }}
                  color="#fff"
                  value={"watch-later"}
                >
                  Watch Later
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="videos">
                <VideosTab
                  userId={profileId}
                  enabled={activeTab === "videos"}
                  isOwner={userId === profileId}
                />
              </Tabs.Content>
              <Tabs.Content value="liked-videos">
                <LikedVideosTab
                  userId={profileId}
                  enabled={activeTab === "liked-videos"}
                />
              </Tabs.Content>
              <Tabs.Content value="playlists">
                <PlaylistsTab
                  userId={profileId}
                  enabled={activeTab === "playlists"}
                  isOwner={userId === profileId}
                />
              </Tabs.Content>{" "}
              <Tabs.Content value="upload-video">
                <UploadVideo />
              </Tabs.Content>
              <Tabs.Content value="watch-later">
                <WatchLater enabled={activeTab === "watch-later"} />
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </Container>
      </Box>
    </>
  );
}
