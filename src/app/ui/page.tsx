"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";

export default function Page() {
  const theme = useTheme();

  const paletteGroups = [
    {
      label: "Primary",
      palette: theme.palette.primary,
    },
    {
      label: "Secondary",
      palette: theme.palette.secondary,
    },
    {
      label: "Error",
      palette: theme.palette.error,
    },
    {
      label: "Warning",
      palette: theme.palette.warning,
    },
    {
      label: "Success",
      palette: theme.palette.success,
    },
    {
      label: "Mono",
      palette: theme.palette.mono,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <header>
        <Typography variant="h1" color="primary">
          Codelt Web Builder 디자인 시스템 가이드
        </Typography>
      </header>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        1. Typography
      </Typography>
      <hr />
      <Typography variant="h1" gutterBottom>
        H1 타이틀 예시
      </Typography>
      <Typography variant="h2" gutterBottom>
        H2 타이틀 예시
      </Typography>
      <Typography variant="h3" gutterBottom>
        H3 타이틀 예시
      </Typography>
      <Typography variant="h4" gutterBottom>
        H4 타이틀 예시
      </Typography>
      <Typography variant="h5" gutterBottom>
        H5 타이틀 예시
      </Typography>
      <Typography variant="body1" gutterBottom>
        이것은 body1 예시입니다. 일반 본문 텍스트에 사용됩니다.
      </Typography>
      <Typography variant="body2" gutterBottom>
        이것은 body2 예시입니다. 좀 더 작은 본문 텍스트에 사용됩니다.
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        2. Buttons
      </Typography>
      <hr />
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="primary">
          Outlined
        </Button>
        <Button variant="text" color="primary">
          Text
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Box>
      {/* 3) Palette Colors (Optional) */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        3. Palette Colors
      </Typography>
      {paletteGroups.map(({ label, palette }) => (
        <Box key={label} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {label}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {["main", "dark", "light", "contrastText"].map((tone) => (
              <ColorBox
                key={tone}
                label={tone}
                value={(palette as any)[tone]}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function ColorBox({ label, value }: { label: string; value?: string }) {
  const colorValue = value || "#ccc";

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          backgroundColor: colorValue,
          borderRadius: 1,
          border: "1px solid #ddd",
        }}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {label}
      </Typography>
      <Typography variant="caption" display="block" sx={{ color: "#555" }}>
        {colorValue}
      </Typography>
    </Box>
  );
}
