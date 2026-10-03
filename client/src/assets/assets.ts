import { toaster } from "@/components/ui/toaster";
import type { Type } from "@/types/toasterType";
import type { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";

type MainSidebarLinks = {
  name: string;
  path: string;
  icon: IconType;
};

export const mainSidebarLinks: MainSidebarLinks[] = [
  {
    name: "Home",
    path: "/",
    icon: FaHome,
  },
  {
    name: "Library",
    path: "/library",
    icon: MdOutlineVideoLibrary,
  },
];

export const endPoint = "http://localhost:3000/";

export const calcFileSize = (size: number) => {
  const sizes = {
    gb: Math.round(size / Math.pow(1024, 3)),
    mb: Math.round(size / Math.pow(1024, 2)),
    kb: Math.round(size / 1024),
  };
  if (size > Math.pow(1024, 3)) return `${sizes.gb}gb`;
  if (size > 1024 * 1024) return `${sizes.mb}mb`;
  if (size > 1024) return `${sizes.kb}kb`;
};

export const createToaster = (description: string, title: string, type: Type) =>
  toaster.create({
    duration: 3000,
    closable: true,
    description,
    title,
    type,
  });

export const tabsTriggers = [
  {
    value: "videos",
    name: "Videos",
  },
  {
    value: "liked-videos",
    name: "Liked Videos",
  },
  {
    value: "Playlists",
    name: "playlists",
  },
  {
    value: "upload-video",
    name: "Upload Video",
  },
];
