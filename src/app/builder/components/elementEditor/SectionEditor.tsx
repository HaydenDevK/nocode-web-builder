"use client";

import { Box, Typography, Slider, TextField, Stack } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";

export default function SectionEditor({ sectionId }: { sectionId: string }) {
  const section = useBuilderStore((state) => state.sections.byId[sectionId]);
  const updateSectionProps = useBuilderStore(
    (state) => state.updateSectionProps
  );

  if (!section) return null;

  const handlePropsChange = (key: keyof typeof section.props, value: any) => {
    updateSectionProps(sectionId, { [key]: value });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="mono">
        Background Color
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={section.props.backgroundColor}
        onChange={(e) => handlePropsChange("backgroundColor", e.target.value)}
      />
    </Stack>
  );
}
