"use client";

import { TextField, Stack } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";

export default function ButtonEditor({ elementId }: { elementId: string }) {
  const element = useBuilderStore((state) => state.elements.byId[elementId]);
  const updateElementProps = useBuilderStore(
    (state) => state.updateElementProps
  );

  if (!element || element.type !== "link") return null;

  const { props } = element;

  const handlePropChange = (key: string, value: any) => {
    updateElementProps(elementId, { [key]: value });
  };

  const handleNumberChange = (key: string, value: string) => {
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      handlePropChange(key, numberValue);
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="텍스트"
        value={props.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
      />
      <TextField
        fullWidth
        label="텍스트 색상"
        value={props.color || ""}
        onChange={(e) => handlePropChange("color", e.target.value)}
      />
      <TextField
        fullWidth
        label="텍스트 크기 (fontSize)"
        value={props.fontSize || ""}
        onChange={(e) => handlePropChange("fontSize", e.target.value)}
      />
      <TextField
        fullWidth
        label="텍스트 굵기 (fontWeight)"
        value={props.fontWeight || ""}
        onChange={(e) => handlePropChange("fontWeight", e.target.value)}
      />
      <TextField
        fullWidth
        label="링크 주소 (href)"
        value={props.href || ""}
        onChange={(e) => handlePropChange("href", e.target.value)}
      />
      <TextField
        fullWidth
        label="배경 색상 (backgroundColor)"
        value={props.backgroundColor || ""}
        onChange={(e) => handlePropChange("backgroundColor", e.target.value)}
      />
      <TextField
        fullWidth
        type="number"
        label="버튼 둥글기 (borderRadius)"
        value={props.borderRadius || ""}
        onChange={(e) => handleNumberChange("borderRadius", e.target.value)}
      />
      <TextField
        fullWidth
        type="number"
        label="버튼 너비 (px)"
        value={props.width || ""}
        onChange={(e) => handleNumberChange("width", e.target.value)}
      />
      <TextField
        fullWidth
        type="number"
        label="버튼 높이 (px)"
        value={props.height || ""}
        onChange={(e) => handleNumberChange("height", e.target.value)}
      />
    </Stack>
  );
}
