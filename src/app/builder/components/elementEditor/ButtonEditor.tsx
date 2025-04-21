import { useElementStore } from "@/app/store/elements.store";
import { useSelectedElementStore } from "@/app/store/selectedElement.store";
import { TextField, Stack, Typography } from "@mui/material";

export default function ButtonEditor() {
  const { selectedId, elementProps, updateElementProp } =
    useSelectedElementStore();

  // 버튼 디자인 업데이트용
  const { updateElementProps } = useElementStore();

  if (!elementProps || typeof elementProps !== "object") return null;

  const handlePropChange = (key: string, value: any) => {
    updateElementProp(key, value);
    if (selectedId) {
      updateElementProps(selectedId, { [key]: value });
    }
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
        value={elementProps.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
      />

      <TextField
        label="텍스트 굵기"
        value={elementProps.fontWeight || ""}
        onChange={(e) => handlePropChange("fontWeight", e.target.value)}
      />

      <TextField
        label="링크"
        value={elementProps.href || ""}
        onChange={(e) => handlePropChange("href", e.target.value)}
      />

      <TextField
        label="색상"
        value={elementProps.color || ""}
        onChange={(e) => handlePropChange("color", e.target.value)}
      />

      <TextField
        type="number"
        label="버튼 둥글기"
        value={elementProps.borderRadius || ""}
        onChange={(e) => handleNumberChange("borderRadius", e.target.value)}
      />

      <TextField
        type="number"
        label="버튼 너비 (px)"
        value={elementProps.width || ""}
        onChange={(e) => handleNumberChange("width", e.target.value)}
      />

      <TextField
        type="number"
        label="버튼 높이 (px)"
        value={elementProps.height || ""}
        onChange={(e) => handleNumberChange("height", e.target.value)}
      ></TextField>
    </Stack>
  );
}
