"use client";

import {
  TextField,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { TTextProps } from "@/app/model/types";

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

  const handleChange = (key: keyof TTextProps, value: any) => {
    updateElementProps(elementId, { [key]: value });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="mono">
        텍스트
      </Typography>
      <TextField
        fullWidth
        value={props.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        폰트 패밀리
      </Typography>
      <FormControl fullWidth>
        <Select
          value={props.fontFamily}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
        >
          <MenuItem value="sans-serif">Sans-serif</MenuItem>
          <MenuItem value="serif">Serif</MenuItem>
          <MenuItem value="monospace">Monospace</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h6" color="mono">
        텍스트 색상
      </Typography>
      <TextField
        fullWidth
        value={props.color || ""}
        onChange={(e) => handlePropChange("color", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        텍스트 크기
      </Typography>
      <TextField
        fullWidth
        value={props.fontSize || ""}
        onChange={(e) => handlePropChange("fontSize", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        텍스트 굵기
      </Typography>
      <TextField
        fullWidth
        value={props.fontWeight || ""}
        onChange={(e) => handlePropChange("fontWeight", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        링크
      </Typography>
      <TextField
        fullWidth
        value={props.href || ""}
        onChange={(e) => handlePropChange("href", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        버튼 색상
      </Typography>
      <TextField
        fullWidth
        value={props.backgroundColor || ""}
        onChange={(e) => handlePropChange("backgroundColor", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        버튼 둥글기
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.borderRadius || ""}
        onChange={(e) => handleNumberChange("borderRadius", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        버튼 너비
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.width || ""}
        onChange={(e) => handleNumberChange("width", e.target.value)}
      />
      <Typography variant="h6" color="mono">
        버튼 높이
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.height || ""}
        onChange={(e) => handleNumberChange("height", e.target.value)}
      />
    </Stack>
  );
}
