"use client";

import React from "react";
import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TTextProps } from "@/app/model/types";
import { FONT_FAMILIES } from "@/constants/font";

interface TextEditorProps {
  elementId: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ elementId }) => {
  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const updateElementProps = useBuilderStore((s) => s.updateElementProps);
  const removeElement = useBuilderStore((s) => s.removeElement);

  if (!element || element.type !== "text") {
    return null;
  }

  const props = element.props as TTextProps;

  const handleChange = (key: keyof TTextProps, value: any) => {
    updateElementProps(elementId, { [key]: value });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="mono">
        Font Family
      </Typography>
      <FormControl fullWidth>
        <Select
          value={props.fontFamily}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
        >
          {FONT_FAMILIES.map((font) => (
            <MenuItem key={font.value} value={font.value}>
              <span style={{ fontFamily: font.value }}>{font.label}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" color="mono">
        Text Size
      </Typography>
      <FormControl fullWidth>
        <Select
          value={props.size}
          onChange={(e) =>
            handleChange("size", e.target.value as TTextProps["size"])
          }
        >
          {["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"].map((val) => (
            <MenuItem key={val} value={val}>
              {val.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" color="mono">
        Font Weight
      </Typography>
      <FormControl fullWidth>
        <Select
          value={props.fontWeight}
          onChange={(e) => handleChange("fontWeight", e.target.value)}
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="bold">Bold</MenuItem>
          <MenuItem value="lighter">Thin</MenuItem>
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
        Background Color
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={props.backgroundColor}
        onChange={(e) => handleChange("backgroundColor", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Padding (px)
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.padding}
        onChange={(e) =>
          handleChange("padding", parseInt(e.target.value, 10) || 0)
        }
      />

      <Typography variant="h6" color="mono">
        Radius (px)
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.radius}
        onChange={(e) =>
          handleChange("radius", parseInt(e.target.value, 10) || 0)
        }
      />

      <Typography variant="h6" color="mono">
        Content
      </Typography>
      <TextField
        fullWidth
        multiline
        maxRows={10}
        value={props.text}
        onChange={(e) => handleChange("text", e.target.value)}
      />

      <Divider />

      <Button
        variant="contained"
        color="warning"
        size="large"
        onClick={() => removeElement(elementId)}
      >
        삭제
      </Button>
    </Stack>
  );
};

export default TextEditor;
