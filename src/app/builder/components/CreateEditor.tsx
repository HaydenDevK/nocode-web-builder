// CreateEditor.tsx
"use client";

import { Text, ImageIcon, SquareMousePointer, Video } from "lucide-react";
import { Stack, Divider, Typography, Button } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilder.store";
import { nanoid } from "nanoid";

export default function CreateEditor() {
  const { addElement } = useBuilderStore();

  const handleAdd = (label: string) => {
    const id = nanoid();

    switch (label) {
      case "text":
        addElement({
          id,
          sectionId: "section-1",
          type: "text",
          props: {
            text: "텍스트입니다.",
            size: "h1",
            fontFamily: "sans-serif",
            fontWeight: "normal",
            color: "#000",
            backgroundColor: "transparent",
            padding: 0,
            radius: 0,
          },
        });
        break;
      case "link":
        addElement({
          id,
          sectionId: "section-1",
          type: "link",
          props: {
            text: "이름을 입력해 주세요",
            href: "",
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 500,
            width: 100,
            height: 50,
            borderRadius: 4,
          },
        });
        break;
    }
  };

  const icons = [
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
