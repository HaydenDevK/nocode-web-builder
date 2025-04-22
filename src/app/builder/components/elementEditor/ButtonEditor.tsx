// ButtonEditor.tsx
import { TextField, Stack, Typography } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilder.store";

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
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h6">버튼 편집</Typography>

      <TextField
        label="텍스트"
        value={props.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
      />
      <TextField
        label="텍스트 굵기"
        value={props.fontWeight || ""}
        onChange={(e) => handlePropChange("fontWeight", e.target.value)}
      />
      <TextField
        label="링크"
        value={props.href || ""}
        onChange={(e) => handlePropChange("href", e.target.value)}
      />
      <TextField
        label="색상"
        value={props.color || ""}
        onChange={(e) => handlePropChange("color", e.target.value)}
      />
      <TextField
        type="number"
        label="버튼 둥글기"
        value={props.borderRadius || ""}
        onChange={(e) => handleNumberChange("borderRadius", e.target.value)}
      />
      <TextField
        type="number"
        label="버튼 너비 (px)"
        value={props.width || ""}
        onChange={(e) => handleNumberChange("width", e.target.value)}
      />
      <TextField
        type="number"
        label="버튼 높이 (px)"
        value={props.height || ""}
        onChange={(e) => handleNumberChange("height", e.target.value)}
      />
    </Stack>
  );
}
