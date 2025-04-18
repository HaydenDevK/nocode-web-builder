"use client";

import TextEditor from "@/components/TextEditor";
import CreateEditor from "@/app/builder/components/CreateEditor";
import styles from "../styles/Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <CreateEditor />
      <TextEditor />
    </div>
  );
}
