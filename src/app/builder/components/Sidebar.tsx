"use client";

import CreateEditor from "@/components/CreateEditor";
import Editor from "@/components/Editor";
import styles from "../styles/Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <CreateEditor />
      <Editor /> {/* hayden */}
    </div>
  );
}
