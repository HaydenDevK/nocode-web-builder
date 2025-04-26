"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import Section from "@/components/Section";
import styles from "../styles/Canvas.module.scss";

const Canvas: React.FC = () => {
  const sectionIds = useBuilderStore((s) => s.sections.allIds);

  return (
    <>
      <div className={styles.canvas}>
        {sectionIds.map((sectionId) => (
          <Section key={sectionId} sectionId={sectionId} />
        ))}
      </div>
    </>
  );
};

export default Canvas;
