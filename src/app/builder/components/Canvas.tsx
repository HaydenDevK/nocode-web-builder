"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import TextElement from "@/components/TextElement";
import styles from "../styles/Canvas.module.scss";

const Canvas: React.FC = () => {
  const sectionIds = useBuilderStore((s) => s.sections.allIds);
  const sectionsById = useBuilderStore((s) => s.sections.byId);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);

  return (
    <div className={styles.canvas}>
      {sectionIds.map((sectionId) => {
        const section = sectionsById[sectionId];
        const isSectionSelected = selectedItemInfo?.type === "section" && selectedItemInfo.itemId === sectionId;

        return (
          <div
            key={sectionId}
            onClick={() => setSelectedItemInfo({ type: "section", itemId: sectionId })}
            style={{
              backgroundColor: section.props.backgroundColor,
              padding: section.props.padding,
              borderRadius: section.props.radius,
              marginBottom: "1rem",
              cursor: "pointer",
              outline: isSectionSelected ? "2px solid #2684FF" : undefined,
            }}
          >
            {section.elementIds.map((elementId) => (
              <TextElement key={elementId} elementId={elementId} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;
