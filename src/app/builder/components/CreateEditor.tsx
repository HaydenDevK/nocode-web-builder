// CreateEditor.tsx
"use client";

import {
  Text,
  ImageIcon,
  SquareMousePointer,
  Video,
  LayoutTemplate,
} from "lucide-react";
import { Stack, Divider, Typography, Button } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { DEFAULT_TEXT_PROPS } from "@/constants/defaultElementProps";
import { TElementTypes } from "@/app/model/types";

export default function CreateEditor() {
  const { addElement, addSection, selectedItemInfo, setSelectedItemInfo } =
    useBuilderStore();

  const handleAdd = (label: string) => {
    if (selectedItemInfo?.type !== "section") return;

    const sectionId = selectedItemInfo.itemId;
    let newId: string | undefined;

    switch (label) {
      case "section":
        addSection();
        break;
      case "text":
        newId = addElement({
          sectionId,
          type: "text",
          props: DEFAULT_TEXT_PROPS,
        });
        break;
      case "link":
        newId = addElement({
          sectionId,
          type: "link",
          props: {
            text: "codeit:)",
            href: "",
            color: "#ffffff",
            backgroundColor: "#A64EFF",
            fontSize: 25,
            fontWeight: 500,
            minWidth: 150,
            minHeight: 50,
            borderRadius: 4,
          },
        });
        break;
      case "image":
        newId = addElement({
          sectionId,
          type: "image",
          props: {
            srcType: "url",
            imageURL: "",
            width: 100,
            radius: 0,
          },
        });
        break;
      case "video":
        newId = addElement({
          sectionId,
          type: "video",
          props: {
            videoSrcType: "youtube",
            videoURL: "",
            width: 100,
          },
        });
        break;
      default:
        return;
    }

    if (newId) {
      setSelectedItemInfo({ type: label as TElementTypes, itemId: newId });
    }
  };
  const icons = [
    { label: "section", icon: <LayoutTemplate size={16} /> },
    { label: "text", icon: <Text size={16} /> },
    { label: "link", icon: <SquareMousePointer size={16} /> },
    { label: "image", icon: <ImageIcon size={16} /> },
    { label: "video", icon: <Video size={16} /> },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="mono">
        생성
      </Typography>
      <Divider />
      {icons.map(({ label, icon }) => {
        // section 버튼은 항상 렌더링
        if (label === "section") {
          return (
            <Button
              key={label}
              fullWidth
              variant="outlined"
              color="inherit"
              startIcon={icon}
              onClick={() => handleAdd(label)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: 14,
                fontWeight: 500,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                color: "#333",
                borderColor: "#ddd",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#aaa",
                },
              }}
            >
              {label}
            </Button>
          );
        }

        // 나머지 버튼들은 selectedItemInfo가 section일 때만 렌더링
        if (selectedItemInfo?.type === "section") {
          return (
            <Button
              key={label}
              fullWidth
              variant="outlined"
              color="inherit"
              startIcon={icon}
              onClick={() => handleAdd(label)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: 14,
                fontWeight: 500,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                color: "#333",
                borderColor: "#ddd",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#aaa",
                },
              }}
            >
              {label}
            </Button>
          );
        }

        return null;
      })}
    </Stack>
  );
}
