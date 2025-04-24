"use client";

import { Typography, Slider, TextField, Stack, Button } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { nanoid } from "nanoid";

export default function SectionEditor({ sectionId }: { sectionId: string }) {
  const section = useBuilderStore((state) => state.sections.byId[sectionId]);
  const updateSectionProps = useBuilderStore(
    (state) => state.updateSectionProps
  );
  const addElement = useBuilderStore((state) => state.addElement);
  const elements = useBuilderStore((state) => state.elements.byId);

  if (!section) return null;

  const handlePropsChange = (key: keyof typeof section.props, value: any) => {
    updateSectionProps(sectionId, { [key]: value });
  };

  const handleCloneSection = () => {
    const newSectionId = `section-${nanoid()}`;

    // 복제된 섹션 생성
    useBuilderStore.setState((state) => {
      state.sections.byId[newSectionId] = {
        id: newSectionId,
        props: { ...section.props },
        elementIds: [],
      };
      state.sections.allIds.push(newSectionId);
    });

    // 요소들 복제
    section.elementIds.forEach((elId) => {
      const originalElement = elements[elId];
      const newElementId = `element-${nanoid()}`;

      const clonedElement = {
        id: newElementId,
        sectionId: newSectionId,
        type: originalElement.type,
        props: { ...originalElement.props },
      };

      addElement(clonedElement);
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="mono">
        Section Settings
      </Typography>

      <TextField
        fullWidth
        type="color"
        value={section.props.backgroundColor}
        onChange={(e) => handlePropsChange("backgroundColor", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Padding
      </Typography>
      <Slider
        value={section.props.padding || 0}
        onChange={(_, value) => handlePropsChange("padding", value)}
        step={1}
        min={0}
        max={100}
      />

      <Typography variant="h6" color="mono">
        Radius
      </Typography>
      <Slider
        value={section.props.radius || 0}
        onChange={(_, value) => handlePropsChange("radius", value)}
        step={1}
        min={0}
        max={100}
      />

      <Button variant="outlined" color="primary" onClick={handleCloneSection}>
        섹션 복제
      </Button>
    </Stack>
  );
}
