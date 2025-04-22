"use client";

import React from "react";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import TextElement from "@/components/TextElement";

interface SectionProps {
  sectionId: string;
}

const Section: React.FC<SectionProps> = ({ sectionId }) => {
  const section = useBuilderStore((s) => s.sections.byId[sectionId]);
  const elementsById = useBuilderStore((s) => s.elements.byId);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);

  const isSectionSelected =
    selectedItemInfo?.type === "section" &&
    selectedItemInfo.itemId === sectionId;

  return (
    <div
      onClick={() =>
        setSelectedItemInfo({ type: "section", itemId: sectionId })
      }
      style={{
        backgroundColor: section.props.backgroundColor,
        padding: section.props.padding,
        borderRadius: section.props.radius,
        marginBottom: "1rem",
        cursor: "pointer",
        outline: isSectionSelected ? "2px solid #2684FF" : undefined,
      }}
    >
      {section.elementIds.map((elementId) => {
        const element = elementsById[elementId];
        switch (element.type) {
          case "text":
            return <TextElement key={elementId} elementId={elementId} />;
          case "image":
            return <></>; // TODO: ImageElement 추가 시 대체
          case "link":
            return <></>;
          case "video":
            return <></>;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Section;
