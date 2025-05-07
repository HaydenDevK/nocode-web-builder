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
        Text
      </Typography>
      <TextField
        fullWidth
        value={props.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Font Family
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
        Text Color
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={props.color}
        onChange={(e) => handleChange("color", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Text Size
      </Typography>
      <TextField
        fullWidth
        value={props.fontSize || ""}
        onChange={(e) => handlePropChange("fontSize", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Font Weight
      </Typography>
      <TextField
        fullWidth
        value={props.fontWeight || ""}
        onChange={(e) => handlePropChange("fontWeight", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Link
      </Typography>
      <TextField
        fullWidth
        value={props.href || ""}
        onChange={(e) => handlePropChange("href", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Button Color
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={props.backgroundColor}
        onChange={(e) => handleChange("backgroundColor", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Rounded Coners
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.borderRadius || ""}
        onChange={(e) => handleNumberChange("borderRadius", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Button Width
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.minWidth || ""}
        onChange={(e) => handleNumberChange("minWidth", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Button Height
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.minHeight || ""}
        onChange={(e) => handleNumberChange("minHeight", e.target.value)}
      />
    </Stack>
  );
}
