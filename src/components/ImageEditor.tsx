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
  ToggleButtonGroup,
  ToggleButton,
  Slider,
  Stack,
} from "@mui/material";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TImageProps } from "@/app/model/types";

const ImageEditor = ({ elementId }: { elementId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const updateElementProps = useBuilderStore((s) => s.updateElementProps);
  const removeElement = useBuilderStore((s) => s.removeElement);

  if (!element || element.type !== "image") return null;
  const props = element.props as TImageProps;

  const {
    srcType = "url",
    imageURL = "",
    width = 0,
    align = "center",
    link = "",
    radius = 0,
  } = props;

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
          <FormControlLabel value="url" control={<Radio />} label="URL" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload" />
        </RadioGroup>
      </FormControl>

      {/* Image URL or Upload */}
      {srcType === "url" ? (
        <TextField
          fullWidth
          placeholder="https://example.com/image.jpg"
          value={imageURL}
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
        <Typography variant="body2">Current: {width}%</Typography>
      </FormControl>

      {/* Alignment */}
      <Typography variant="h6" color="mono">
        Alignment
      </Typography>
      <FormControl>
        <ToggleButtonGroup
          value={align}
          exclusive
          onChange={(_, newAlign) => {
            if (newAlign !== null) handleChange("align", newAlign);
          }}
          size="small"
        >
          <ToggleButton value="left">
            <AlignLeft size={20} />
          </ToggleButton>
          <ToggleButton value="center">
            <AlignCenter size={20} />
          </ToggleButton>
          <ToggleButton value="right">
            <AlignRight size={20} />
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      {/* Link */}
      <Typography variant="h6" color="mono">
        Link
      </Typography>
      <TextField
        fullWidth
        placeholder="https://example.com"
        value={link}
        onChange={(e) => handleChange("link", e.target.value)}
      />

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
