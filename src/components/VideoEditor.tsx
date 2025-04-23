"use client";

import {
  Stack,
  Typography,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Slider,
  Button,
} from "@mui/material";
import { useRef } from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import type { TVideoProps } from "@/app/model/types";

const VideoEditor = ({ elementId }: { elementId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const element = useBuilderStore((s) => s.elements.byId[elementId]);
  const updateElementProps = useBuilderStore((s) => s.updateElementProps);
  const removeElement = useBuilderStore((s) => s.removeElement);

  if (!element || element.type !== "video") return null;
  const props = element.props as TVideoProps;

  const { videoSrcType = "youtube", videoURL = "", width = 100 } = props;

  const handleChange = (key: keyof TVideoProps, value: any) => {
    updateElementProps(elementId, { [key]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleChange("videoURL", reader.result);
        handleChange("videoSrcType", "upload");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" color="mono">
        Video Source
      </Typography>
      <FormControl fullWidth>
        <RadioGroup
          row
          value={videoSrcType}
          onChange={(e) => handleChange("videoSrcType", e.target.value)}
        >
          <FormControlLabel
            value="youtube"
            sx={{ color: "mono.dark" }}
            control={<Radio />}
            label="YouTube"
          />
          <FormControlLabel
            sx={{ color: "mono.dark" }}
            value="upload"
            control={<Radio />}
            label="Upload"
          />
        </RadioGroup>
      </FormControl>

      <Typography variant="h6" color="mono">
        {videoSrcType === "youtube" ? "Video URL" : "Video File"}
      </Typography>
      {videoSrcType === "youtube" ? (
        <TextField
          fullWidth
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoURL ?? ""}
          onChange={(e) => handleChange("videoURL", e.target.value)}
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
            accept="video/*"
            hidden
            onChange={handleFileUpload}
          />
        </>
      )}

      <Typography variant="h6" color="mono">
        Width (%)
      </Typography>
      <FormControl fullWidth>
        <Slider
          value={width}
          onChange={(_, newValue) => {
            if (typeof newValue === "number") handleChange("width", newValue);
          }}
          valueLabelDisplay="auto"
          min={10}
          max={100}
        />
        <Typography variant="body2">Current: {width}%</Typography>
      </FormControl>

      <Divider />

      <Button
        variant="contained"
        color="warning"
        onClick={() => removeElement(elementId)}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default VideoEditor;
