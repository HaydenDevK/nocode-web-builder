"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import DraggableElement from "@/app/builder/components/DraggableElement";
import SectionToolButton from "./SectionToolButton";
import { BuilderElement } from "./BuilderElement";
import { useViewportStore } from "@/app/store/useViewportStore";
import styles from "./Section.module.scss";
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

  if (!section) return null;

  const isSectionSelected = selectedItemInfo?.type === "section" && selectedItemInfo.itemId === section.id;

  const mode = useViewportStore((s) => s.mode);

  const paddingTopBottom =
    mode === "desktop" ? section.props.paddingDesktopTopBottom ?? 0 : section.props.paddingMobileTopBottom ?? 0;

  const paddingLeftRight =
    mode === "desktop" ? section.props.paddingDesktopLeftRight ?? 0 : section.props.paddingMobileLeftRight ?? 0;
  const columns = section.props.columns ?? "1";
  // const columnCount = getColumnCount(columns);
  const hasElements = section.elementIds.length > 0;

  useEffect(() => {
    useBuilderStore.getState().initializeSectionGrid(section.id, columns);
  }, [section.id, columns]);

  return (
    <div className={styles.sectionWrap}>
      <section
        onClick={() => setSelectedItemInfo({ type: "section", itemId: section.id })}
        className={`${styles.section} ${mode === "mobile" ? styles.mobile : ""}`}
        style={{
          backgroundColor: section.props.backgroundColor,
          padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
          borderRadius: section.props.radius,
          cursor: "pointer",
          outline: isSectionSelected ? "3px dashed #2684FF" : undefined,
          minHeight: hasElements ? "10px" : "100px",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            () => setSelectedItemInfo({ type: "section", itemId: section.id });
          }
        }}
      >
        <div
          className={mode === "desktop" ? styles.desktop : undefined}
          style={{
            display: "grid",
            gridTemplateColumns: getGridTemplateColumns(columns),
            alignItems: "stretch",
            gap: "16px",
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

// function getColumnCount(columns: string) {
//   switch (columns) {
//     case "1":
//       return 1;
//     case "1-1":
//       return 2;
//     case "1-1-1":
//       return 3;
//     case "1-1-1-1":
//       return 4;
//     case "2-1":
//     case "1-2":
//       return 2;
//     default:
//       return 1;
//   }
// }

function shouldApplyMinHeight(elementIds: string[]) {
  return elementIds.length === 0;
}
