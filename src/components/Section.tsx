"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import DraggableElement from "@/app/builder/components/DraggableElement";
import SectionToolButton from "./SectionToolButton";
import { BuilderElement } from "./BuilderElement";
import { useViewportStore } from "@/app/store/useViewportStore";
import { useIsEditingStore } from "@/app/store/useIsEditingStore";
import type { TElement, TSection } from "@/app/model/types";
import { useEffect } from "react";

interface ISectionProps {
  section: TSection;
  elements: {
    byId: Record<string, TElement>;
    allIds: string[];
  };
}

const Section: React.FC<ISectionProps> = ({ section, elements }) => {
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);
  const isEditing = useIsEditingStore((s) => s.isEditing);
  if (!section) return null;

  const isSectionSelected = selectedItemInfo?.type === "section" && selectedItemInfo.itemId === section.id;

  const mode = useViewportStore((s) => s.mode);

  const paddingTopBottom =
    mode === "desktop" ? section.props.paddingDesktopTopBottom ?? 0 : section.props.paddingMobileTopBottom ?? 0;

  const paddingLeftRight =
    mode === "desktop" ? section.props.paddingDesktopLeftRight ?? 0 : section.props.paddingMobileLeftRight ?? 0;
  const columns = section.props.columns ?? "1";
  const hasElements = section.elementIds.length > 0;

  useEffect(() => {
    useBuilderStore.getState().initializeSectionGrid(section.id, columns);
  }, [section.id, columns]);

  return (
    <div style={{ position: "relative" }}>
      <section
        onClick={() => setSelectedItemInfo({ type: "section", itemId: section.id })}
        style={{
          display: "flex",
          gap: "16px",
          backgroundColor: section.props.backgroundColor,
          padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
          borderRadius: section.props.radius,
          cursor: isEditing ? "pointer" : "default",
          outline: isSectionSelected && isEditing ? "3px dashed #2684FF" : undefined,
          minHeight: hasElements ? "10px" : "100px",
          width: "100%",
          margin: isSectionSelected ? "3px auto" : "0 auto",
          transition: "max-width 0.2s ease",
          border: isEditing ? "1px dashed #cccccc" : "none",
          maxWidth: mode === "desktop" ? "1024px" : "375px",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            () => setSelectedItemInfo({ type: "section", itemId: section.id });
          }
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: getGridTemplateColumns(columns),
            alignItems: "stretch",
            gap: "16px",
            width: "100%",
            margin: "0 auto",
            paddingTop: mode === "desktop" ? "4px" : "0",
          }}
        >
          {section.elementIds.map((elementId) => {
            const element = elements.byId[elementId];
            return (
              <div
                key={elementId}
                style={{
                  border: "1px dashed #ccc",
                  minHeight: shouldApplyMinHeight(section.elementIds) ? "150px" : "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DraggableElement elementId={elementId}>{element ? BuilderElement(element) : null}</DraggableElement>
              </div>
            );
          })}
        </div>
      </section>
      {isSectionSelected && <SectionToolButton sectionId={section.id} isActive={isSectionSelected} />}
    </div>
  );
};

export default Section;

function getGridTemplateColumns(columns: string) {
  switch (columns) {
    case "1":
      return "1fr";
    case "1-1":
      return "1fr 1fr";
    case "1-1-1":
      return "1fr 1fr 1fr";
    case "1-1-1-1":
      return "1fr 1fr 1fr 1fr";
    case "2-1":
      return "2fr 1fr";
    case "1-2":
      return "1fr 2fr";
    default:
      return "1fr";
  }
}

function shouldApplyMinHeight(elementIds: string[]) {
  return elementIds.length === 0;
}
