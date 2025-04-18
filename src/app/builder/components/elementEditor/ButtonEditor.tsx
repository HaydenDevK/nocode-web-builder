import { useElementStore } from "@/app/store/elements.store";
import { useSelectedElementStore } from "@/app/store/selectedElement.store";
import { TextField, Slider, Stack, Typography } from "@mui/material";

export default function ButtonEditor() {
  const { selectedId, elementProps, updateElementProp } =
    useSelectedElementStore();

  // 버튼 디자인 업데이트용
  const { updateElementProps } = useElementStore();

  const handlePropChange = (key: string, value: any) => {
    updateElementProp(key, value);
    if (selectedId) {
      updateElementProps(selectedId, { [key]: value });
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
        label="링크"
        value={elementProps.href || ""}
        onChange={(e) => handlePropChange("href", e.target.value)}
      />

      <TextField
        label="색상"
        value={elementProps.color || ""}
        onChange={(e) => handlePropChange("color", e.target.value)}
      />

      <Typography>폰트 크기</Typography>
      <Slider
        value={elementProps.fontSize || 16}
        min={10}
        max={30}
        onChange={(_, value) => handlePropChange("fontSize", value)}
      />
    </Stack>
  );
}
