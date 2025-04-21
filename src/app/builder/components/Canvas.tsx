"use client";

// Canvas
import styles from "../styles/Canvas.module.scss";
import { useElementStore } from "@/app/store/elements.store";
import ElementRenderer from "@/app/builder/containers/ElementRenderer";

export default function Canvas() {
  const { elements } = useElementStore();

  return (
    <div className={styles.canvas}>
      {elements.map((element) => (
        <ElementRenderer key={element.id} element={element} />
      ))}
    </div>
  );
}
