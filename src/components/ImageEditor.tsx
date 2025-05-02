"use client";

import React, { useRef } from "react";
import {
  Button,
  Divider,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Slider,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TImageProps } from "@/app/model/types";

const ImageEditor = ({ elementId }: { elementId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const updateElementProps = useBuilderStore((s) => s.updateElementProps);
  const removeElement = useBuilderStore((s) => s.removeElement);

  if (!element || element.type !== "image") return null;
  const props = element.props as TImageProps;

  const { srcType = "url", imageURL = "", width = 0, radius = 0 } = props;

  const handleChange = (key: keyof TImageProps, value: any) => {
    updateElementProps(elementId, { [key]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleChange("imageURL", reader.result);
        handleChange("srcType", "upload");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={3}>
      {/* Image Source Type */}
      <Typography variant="h6" color="mono">
        Image Source
      </Typography>
      <FormControl fullWidth>
        <RadioGroup
          row
          value={srcType}
          onChange={(e) => handleChange("srcType", e.target.value)}
        >
          <FormControlLabel
            color="mono"
            value="url"
            sx={{ color: "mono.dark" }}
            control={<Radio />}
            label="URL"
          />
          <FormControlLabel
            color="mono"
            value="upload"
            sx={{ color: "mono.dark" }}
            control={<Radio />}
            label="Upload"
          />
        </RadioGroup>
      </FormControl>

      {/* Image URL or Upload */}
      {srcType === "url" ? (
        <TextField
          fullWidth
          placeholder="https://example.com/image.jpg"
          value={imageURL ?? ""}
          onChange={(e) => handleChange("imageURL", e.target.value)}
        />
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />
        </>
      )}

      {/* Width */}
      <Typography variant="h6" color="mono">
        Width (%)
      </Typography>
      <FormControl fullWidth>
        <Slider
          value={width}
          onChange={(_, newValue) => {
            if (newValue !== null) handleChange("width", newValue);
          }}
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
        <Typography variant="body2" sx={{ color: "mono.dark" }}>
          Current: {width}%
        </Typography>
      </FormControl>
      <Typography variant="h6" color="mono">
        Image Align
      </Typography>
      <FormControl fullWidth>
        <Select
          value={props.imgAlign || "center"}
          onChange={(e) => handleChange("imgAlign", e.target.value)}
        >
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </Select>
      </FormControl>

      {/* Radius */}
      <Typography variant="h6" color="mono">
        Border Radius (px)
      </Typography>
      <TextField
        type="number"
        inputProps={{ min: 0 }}
        value={radius}
        onChange={(e) =>
          handleChange("radius", Number.parseInt(e.target.value, 10) || 0)
        }
      />

      <Divider />

      <Button
        variant="contained"
        color="warning"
        size="large"
        onClick={() => removeElement(elementId)}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default ImageEditor;
