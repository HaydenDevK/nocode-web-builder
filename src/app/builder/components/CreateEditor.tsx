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
import { nanoid } from "nanoid";
import { DEFAULT_TEXT_PROPS } from "@/constant/defaultElementProps";

export default function CreateEditor() {
  const { addElement } = useBuilderStore();

  const handleAdd = (label: string) => {
    const id = nanoid();

    switch (label) {
      case "text":
        addElement({
          id: "text1",
          sectionId: "section-1",
          type: "text",
          props: DEFAULT_TEXT_PROPS,
        });
        break;
      case "link":
        addElement({
          id,
          sectionId: "section-1",
          type: "link",
          props: {
            text: "codeit:)",
            href: "",
            color: "#ffffff",
            backgroundColor: "#A64EFF",
            fontSize: 16,
            fontWeight: 500,
            width: 100,
            height: 50,
            borderRadius: 4,
            fontFamily: "sans-serif",
          },
        });
        break;

      case "image":
        addElement({
          id,
          sectionId: "section-1", // 임시로 여기에 넣겠습니다.
          type: "image",
          props: {
            imageURL: null,
            srcType: "url",
            width: 100,
            radius: 0,
          },
        });
        break;

      case "video":
        addElement({
          id,
          sectionId: "section-1", // 임시로 여기에 넣겠습니다.
          type: "video",
          props: {
            videoURL: null,
            videoSrcType: "youtube",
            width: 100,
          },
        });
        break;
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
      {icons.map(({ label, icon }) => (
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
      ))}
    </Stack>
  );
}
