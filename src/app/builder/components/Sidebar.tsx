"use client";

import CreateEditor from "./CreateEditor";
import Editor from "@/components/Editor";
import styles from "../styles/Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <CreateEditor />
      <Editor />
    </div>
  );
}
