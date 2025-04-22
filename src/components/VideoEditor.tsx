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
import { useSelectedElementStore } from "@/app/store/selectedElement.store";

const VideoEditor = ({ elementId }: { elementId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { elementProps, updateElementProp } = useSelectedElementStore();

  const {
    videoSrcType = "youtube",
    videoURL = "",
    width = "100",
  } = elementProps;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateElementProp("videoURL", reader.result);
        updateElementProp("videoSrcType", "upload");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" color="mono">
        비디오 편집
      </Typography>
      <Divider />

      {/* 비디오 소스 타입 */}
      <Typography variant="h6" color="mono">
        비디오 소스
      </Typography>
      <FormControl fullWidth>
        <RadioGroup
          row
          value={videoSrcType}
          onChange={(e) => updateElementProp("videoSrcType", e.target.value)}
        >
          <FormControlLabel
            value="youtube"
            control={<Radio />}
            label="YouTube"
          />
          <FormControlLabel
            value="upload"
            control={<Radio />}
            label="직접 삽입"
          />
        </RadioGroup>
      </FormControl>

      {/* 비디오 링크 or 업로드 */}
      <Typography variant="h6" color="mono">
        {videoSrcType === "youtube" ? "비디오 링크" : "비디오 파일"}
      </Typography>
      {videoSrcType === "youtube" ? (
        <TextField
          fullWidth
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoURL}
          onChange={(e) => updateElementProp("videoURL", e.target.value)}
        />
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
          >
            파일 업로드
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

      {/* 넓이 */}
      <Typography variant="h6" color="mono">
        넓이 (%)
      </Typography>
      <FormControl fullWidth>
        <Slider
          value={Number.parseInt(width)}
          onChange={(_, newValue) => {
            if (newValue !== null) updateElementProp("width", String(newValue));
          }}
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
        <Typography variant="body2">현재: {width}%</Typography>
      </FormControl>
    </Stack>
  );
};

export default VideoEditor;
