"use client";

import TextEditor from "@/components/TextEditor";
import CreateEdirot from "@/components/CreateEditor";
import styles from "../styles/Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <CreateEdirot />
      <TextEditor />
    </div>
  );
}
