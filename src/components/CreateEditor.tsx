import {
  LayoutTemplate,
  Text,
  ImageIcon,
  SquareMousePointer,
} from "lucide-react";
import { Stack, Divider, Typography, Button } from "@mui/material";

export default function CreateEdirot() {
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
