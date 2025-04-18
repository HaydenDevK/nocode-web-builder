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
      case "섹션":
        addElement({ id, type: "섹션", content: "새로운 섹션" });
        break;
      case "텍스트":
        addElement({
          id,
          type: "텍스트",
          value: "텍스트입니다.",
          fontSize: 16,
        });
        break;
      case "이미지":
        addElement({ id, type: "이미지", url: "", width: 150, height: 150 });
        break;
      case "버튼":
        addElement({
          id,
          type: "버튼",
          text: "버튼",
          href: "",
          color: "",
          fontSize: 16,
          fontWeight: 500,
          borderRadius: 0,
        });
        break;
    }
  };

  const icons = [
    { label: "섹션", icon: <LayoutTemplate size={16} /> },
    { label: "텍스트", icon: <Text size={16} /> },
    { label: "이미지", icon: <ImageIcon size={16} /> },
    { label: "버튼", icon: <SquareMousePointer size={16} /> },
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
