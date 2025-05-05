"use client";

import React from "react";
import {
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
import { useViewportStore } from "@/app/store/useViewportStore";

interface TextEditorProps {
  elementId: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ elementId }) => {
  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const updateElementProps = useBuilderStore((s) => s.updateElementProps);
  const mode = useViewportStore((s) => s.mode);

  if (!element || element.type !== "text") return null;

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
          value={props.fontFamily ?? "Spoqa Han Sans Neo"}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
        >
          {FONT_FAMILIES.map((font) => (
            <MenuItem key={font.value} value={font.value}>
              <span style={{ fontFamily: font.value }}>{font.label}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {mode === "desktop" && (
        <>
          <Typography variant="h6" color="mono">
            Desktop Text Size
          </Typography>
          <FormControl fullWidth>
            <Select
              value={props.desktopFontSize ?? "body1"}
              onChange={(e) =>
                handleChange(
                  "desktopFontSize",
                  e.target.value as TTextProps["desktopFontSize"]
                )
              }
            >
              {["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"].map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val.toUpperCase()}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <Typography variant="h6" color="mono">
            Desktop Font Weight
          </Typography>
          <FormControl fullWidth>
            <Select
              value={props.desktopFontWeight ?? "normal"}
              onChange={(e) =>
                handleChange("desktopFontWeight", e.target.value)
              }
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="bold">Bold</MenuItem>
              <MenuItem value="lighter">Thin</MenuItem>
            </Select>
          </FormControl>
        </>
      )}

      {mode === "mobile" && (
        <>
          <Typography variant="h6" color="mono">
            Mobile Text Size
          </Typography>
          <FormControl fullWidth>
            <Select
              value={props.mobileFontSize ?? "body1"}
              onChange={(e) =>
                handleChange(
                  "mobileFontSize",
                  e.target.value as TTextProps["mobileFontSize"]
                )
              }
            >
              {["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"].map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val.toUpperCase()}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <Typography variant="h6" color="mono">
            Mobile Font Weight
          </Typography>
          <FormControl fullWidth>
            <Select
              value={props.mobileFontWeight ?? "normal"}
              onChange={(e) => handleChange("mobileFontWeight", e.target.value)}
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="bold">Bold</MenuItem>
              <MenuItem value="lighter">Thin</MenuItem>
            </Select>
          </FormControl>
        </>
      )}

      <Typography variant="h6" color="mono">
        Text Align
      </Typography>
      <FormControl fullWidth>
        <Select
          value={props.textAlign ?? "center"}
          onChange={(e) => handleChange("textAlign", e.target.value)}
        >
          <MenuItem value="left">left</MenuItem>
          <MenuItem value="center">center</MenuItem>
          <MenuItem value="right">right</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" color="mono">
        Text Color
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={props.color ?? "#000000"}
        onChange={(e) => handleChange("color", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Background Color
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={props.backgroundColor ?? "#ffffff"}
        onChange={(e) => handleChange("backgroundColor", e.target.value)}
      />

      <Typography variant="h6" color="mono">
        Padding (px)
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={props.padding ?? 0}
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
        value={props.radius ?? 0}
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
        value={props.text ?? ""}
        onChange={(e) => handleChange("text", e.target.value)}
      />
    </Stack>
  );
};

export default TextEditor;
