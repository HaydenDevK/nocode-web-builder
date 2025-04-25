"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { useViewportStore } from "@/app/store/useViewportStore";
import TextElement from "@/components/TextElement";
import LinkButton from "@/app/builder/components/LinkButton";
import ImageElement from "./ImageElement";
import VideoElement from "./VideoElement";
import styles from "./Section.module.scss";

interface SectionProps {
  sectionId: string;
}

const Section: React.FC<SectionProps> = ({ sectionId }) => {
  const section = useBuilderStore((s) => s.sections.byId[sectionId]);
  const elementsById = useBuilderStore((s) => s.elements.byId);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);
  const mode = useViewportStore((s) => s.mode);

  const isSectionSelected =
    selectedItemInfo?.type === "section" &&
    selectedItemInfo.itemId === sectionId;

  return (
    <section
      onClick={() =>
        setSelectedItemInfo({ type: "section", itemId: sectionId })
      }
      className={`${styles.section} ${mode === "mobile" ? styles.mobile : ""}`}
      style={{
        backgroundColor: section.props.backgroundColor,
        padding: section.props.padding,
        borderRadius: section.props.radius,
        cursor: "pointer",
        outline: isSectionSelected ? "3px dashed #2684FF" : undefined,
      }}
    >
      <div className={mode === "desktop" ? styles.desktop : undefined}>
        {section.elementIds.map((elementId) => {
          const element = elementsById[elementId];
          switch (element.type) {
            case "text":
              return <TextElement key={elementId} elementId={elementId} />;
            case "image":
              return <ImageElement key={elementId} elementId={elementId} />;
            case "link":
              return <LinkButton key={elementId} elementId={elementId} />;
            case "video":
              return <VideoElement key={elementId} elementId={elementId} />;
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default Section;
