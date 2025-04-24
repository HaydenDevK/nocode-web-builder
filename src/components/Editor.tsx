"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import { Divider, Stack, Typography } from "@mui/material";
import TextEditor from "./TextEditor";

const Editor: React.FC = () => {
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);

  if (!selectedItemInfo) {
    return (
      <Stack spacing={2}>
        <Typography variant="h4" color="mono">
          편집
        </Typography>
        <Divider />
        <Typography variant="h6" color="mono.light">
          편집할 요소를 선택하세요
        </Typography>
      </Stack>
    );
  }

  const { type, itemId } = selectedItemInfo;
  let editorComponent: React.ReactNode = null;

  switch (type) {
    case "section":
      editorComponent = <></>;
      break;
    case "text":
      editorComponent = <TextEditor elementId={itemId} />;
      break;
    case "link":
      editorComponent = <></>;
      break;
    case "image":
      editorComponent = <></>;
      break;
    case "video":
      editorComponent = <></>;
      break;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="mono">
        편집
      </Typography>
      <Divider />
      {editorComponent}
    </Stack>
  );
};

export default Editor;
