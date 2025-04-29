"use client";

import Image from "next/image";
import styles from "../styles/Toolbar.module.scss";
import { AppBar, Toolbar as MUIToolbar, Button } from "@mui/material";
import { useViewportStore } from "@/app/store/useViewportStore";
import { useBuilderStore } from "@/app/store/useBuilderStore";

export default function Toolbar() {
  const mode = useViewportStore((s) => s.mode);
  const setMode = useViewportStore((s) => s.setMode);
  const { saveToLocalStorage } = useBuilderStore();
  return (
    <AppBar position="static" color="default" className={styles.toolbar}>
      <MUIToolbar className={styles.inner}>
        <div className={styles.left}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: 8 }}
            onClick={saveToLocalStorage}
          >
            임시 저장
          </Button>
        </div>
        <div>
          <Button
            aria-label="Desktop View"
            variant={mode === "desktop" ? "contained" : "outlined"}
            onClick={() => setMode("desktop")}
            size="small"
            sx={{ minWidth: 40, padding: 1, mr: 1 }}
          >
            <Image
              src="/desktop.svg"
              alt="Desktop icon"
              width={24}
              height={24}
            />
          </Button>
          <Button
            aria-label="Mobile View"
            variant={mode === "mobile" ? "contained" : "outlined"}
            onClick={() => setMode("mobile")}
            size="small"
            sx={{ minWidth: 40, padding: 1 }}
          >
            <Image src="/mobile.svg" alt="Mobile icon" width={24} height={24} />
          </Button>
        </div>
        <div className={styles.actions}>
          <Button variant="contained" color="primary">
            HTML 추출
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: 8 }}
          >
            배포
          </Button>
        </div>
      </MUIToolbar>
    </AppBar>
  );
}
