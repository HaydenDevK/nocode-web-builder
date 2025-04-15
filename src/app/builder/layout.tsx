"use client";

import { ReactNode } from "react";
import Toolbar from "@/app/builder/components/Toolbar";
import Sidebar from "@/app/builder/components/Sidebar";
import styles from "./styles/Layout.module.scss";

export default function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Toolbar />
      <div className={styles.main}>
        <div className={styles.canvasWrapper}>{children}</div>
        <Sidebar />
      </div>
    </div>
  );
}
