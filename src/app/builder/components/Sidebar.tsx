"use client";

// Sidebar
import CreateEditor from "@/app/builder/components/CreateEditor";
import styles from "../styles/Sidebar.module.scss";
import ElementEditor from "./elementEditor/ElementEditor";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <CreateEditor />
      <ElementEditor />
    </div>
  );
}
