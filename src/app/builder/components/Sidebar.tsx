"use client";

import CreateEditor from "./CreateEditor";
import Editor from "@/components/Editor";
import styles from "../styles/Sidebar.module.scss";
import { Button, Stack, Box } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";

export default function Sidebar() {
  const { selectedItemInfo, removeSection, removeElement } = useBuilderStore();

  const handleDelete = () => {
    if (selectedItemInfo?.type === "section") {
      removeSection(selectedItemInfo.itemId);
    } else if (selectedItemInfo?.type) {
      removeElement(selectedItemInfo.itemId);
    }
  };

  return (
    <div className={styles.sidebar}>
      <Stack spacing={2} sx={{ pb: 12 }}>
        <CreateEditor />
        <Editor />
      </Stack>
      {selectedItemInfo && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "inherit",
            maxWidth: "inherit",
            p: 2,
            backgroundColor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleDelete}
            fullWidth
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            삭제
          </Button>
        </Box>
      )}
    </div>
  );
}
