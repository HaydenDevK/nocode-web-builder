"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableElement from "@/app/builder/components/SortableElement";
import SectionToolButton from "./SectionToolButton";
import { BuilderElement } from "./BuilderElement";
import { useViewportStore } from "@/app/store/useViewportStore";
import { useIsEditingStore } from "@/app/store/useIsEditingStore";

interface SectionProps {
  sectionId: string;
}

const Section: React.FC<SectionProps> = ({ sectionId }) => {
  const section = useBuilderStore((s) => s.sections.byId[sectionId]);
  const elementsById = useBuilderStore((s) => s.elements.byId);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);
  const isEditing = useIsEditingStore((s) => s.isEditing);
  if (!section) return null;

  const isSectionSelected =
    selectedItemInfo?.type === "section" &&
    selectedItemInfo.itemId === sectionId;

  const mode = useViewportStore((s) => s.mode);

  const paddingTopBottom =
    mode === "desktop"
      ? section.props.paddingDesktopTopBottom ?? 0
      : section.props.paddingMobileTopBottom ?? 0;

  const paddingLeftRight =
    mode === "desktop"
      ? section.props.paddingDesktopLeftRight ?? 0
      : section.props.paddingMobileLeftRight ?? 0;
  const columns = section.props.columns ?? "1";
  const columnCount = getColumnCount(columns);

  const hasElements = section.elementIds.length > 0;

  return (
    <div style={{ position: "relative" }}>
      <section
        onClick={() =>
          setSelectedItemInfo({ type: "section", itemId: sectionId })
        }
        style={{
          display: "flex",
          gap: "16px",
          backgroundColor: section.props.backgroundColor,
          padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
          borderRadius: section.props.radius,
          cursor: isEditing ? "pointer" : "default",
          outline:
            isSectionSelected && isEditing ? "3px dashed #2684FF" : undefined,
          minHeight: hasElements ? "10px" : "100px",
          width: "100%",
          margin: "0 auto",
          transition: "max-width 0.2s ease",
          border: isEditing ? "1px dashed #cccccc" : "none",
          maxWidth: mode === "desktop" ? "1024px" : "375px",
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
          <SortableContext
            items={section.elementIds}
            strategy={horizontalListSortingStrategy}
          >
            {Array.from({ length: columnCount }).map((_, idx) => {
              const elementId = section.elementIds[idx];
              const element = elementId ? elementsById[elementId] : null;
              return (
                <div
                  key={idx}
                  style={{
                    border: isEditing ? "1px dashed #cccccc" : "none",
                    minHeight: shouldApplyMinHeight(section.elementIds)
                      ? "150px"
                      : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SortableElement key={elementId} elementId={elementId}>
                    {element ? BuilderElement(element) : null}
                  </SortableElement>
                </div>
              );
            })}
          </SortableContext>
        </div>
      </section>
      {isSectionSelected && isEditing && (
        <SectionToolButton
          sectionId={section.id}
          isActive={isSectionSelected}
        />
      )}
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

function getColumnCount(columns: string) {
  switch (columns) {
    case "1":
      return 1;
    case "1-1":
      return 2;
    case "1-1-1":
      return 3;
    case "1-1-1-1":
      return 4;
    case "2-1":
    case "1-2":
      return 2;
    default:
      return 1;
  }
}

function shouldApplyMinHeight(elementIds: string[]) {
  return elementIds.length === 0;
}
