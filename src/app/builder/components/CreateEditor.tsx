// CreateEditor
import {
  LayoutTemplate,
  Text,
  ImageIcon,
  SquareMousePointer,
} from "lucide-react";
import { Stack, Divider, Typography, Button } from "@mui/material";
import { useElementStore } from "@/app/store/elements.store";

export default function CreateEdirot() {
  const { addElement } = useElementStore();

  const handleAdd = (label: string) => {
    const id = crypto.randomUUID();

    switch (label) {
      case "section":
        addElement({ id, type: "section", content: "새로운 섹션" });
        break;
      case "text":
        addElement({
          id,
          type: "text",
          value: "텍스트입니다.",
          fontSize: 16,
        });
        break;
      case "image":
        addElement({ id, type: "image", url: "", width: 150, height: 150 });
        break;
      case "button":
        addElement({
          id,
          type: "button",
          text: "버튼",
          href: "",
          color: "",
          fontSize: 16,
          fontWeight: 500,
          width: 100,
          height: 100,
          borderRadius: 0,
        });
        break;
    }
  };

  const icons = [
    { label: "section", icon: <LayoutTemplate size={16} /> },
    { label: "text", icon: <Text size={16} /> },
    { label: "image", icon: <ImageIcon size={16} /> },
    { label: "button", icon: <SquareMousePointer size={16} /> },
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
