"use client";

// Toolbar
import Image from "next/image";
import styles from "../styles/Toolbar.module.scss";
import { AppBar, Toolbar as MUIToolbar, Button } from "@mui/material";

export default function Toolbar() {
  return (
    <AppBar position="static" color="default" className={styles.toolbar}>
      <MUIToolbar className={styles.inner}>
        <div className={styles.left}>{/* 로고나 비워두기 */}</div>
        <div>
          <Button aria-label="Desktop View">
            <Image
              src="/desktop.svg"
              alt="Desktop icon"
              width={24}
              height={24}
            />
          </Button>
          <Button aria-label="Mobile View" size="small">
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
