"use client";

import Image from "next/image";
import styles from "../styles/Toolbar.module.scss";
import { AppBar, Toolbar as MUIToolbar, Button } from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { generateHTML } from "@/util/htmlExport";
import { useViewportStore } from "@/app/store/useViewportStore";
import { useIsEditingStore } from "@/app/store/useIsEditingStore";
import DeployButton from "@/components/DeployButton";

export default function Toolbar() {
  const setSelectedItemInfo = useBuilderStore(
    (store) => store.setSelectedItemInfo
  );
  const setIsEditing = useIsEditingStore((store) => store.setIsEditing);
  const mode = useViewportStore((s) => s.mode);
  const setMode = useViewportStore((s) => s.setMode);
  const { saveToLocalStorage } = useBuilderStore();

  const handleExportHTML = () => {
    setSelectedItemInfo(null);
    setIsEditing(false);
    setMode("desktop");

    // React 리렌더링 완료를 기다리기 위해 requestAnimationFrame 사용
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const html = generateHTML();

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "codeit_promo_.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setIsEditing(true);
      });
    });
  };

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
            Save Draft
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleExportHTML}
          >
            Export HTML
          </Button>
          <DeployButton />
        </div>
      </MUIToolbar>
    </AppBar>
  );
}
