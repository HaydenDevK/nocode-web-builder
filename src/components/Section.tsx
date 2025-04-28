"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableElement from "@/app/builder/components/SortableElement";
import styles from "../app/builder/styles/Canvas.module.scss";
import SectionToolButton from "./SectionToolButton";
import { BuilderElement } from "./BuilderElement";

interface SectionProps {
  sectionId: string;
}

const Section: React.FC<SectionProps> = ({ sectionId }) => {
  const section = useBuilderStore((s) => s.sections.byId[sectionId]);
  const elementsById = useBuilderStore((s) => s.elements.byId);
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);
  const isSectionSelected = selectedItemInfo?.type === "section" && selectedItemInfo.itemId === sectionId;

  return (
    <div className={styles.sectionWrap}>
      <section
        onClick={() => setSelectedItemInfo({ type: "section", itemId: sectionId })}
        className={styles.sectionElement}
        style={{
          backgroundColor: section.props.backgroundColor,
          padding: section.props.padding,
          borderRadius: section.props.radius,
          // marginBottom: "1rem",
          cursor: "pointer",
          outline: isSectionSelected ? "3px dashed #2684FF" : undefined,
          width: "100%",
          minHeight: "100px",
        }}
      >
        <SortableContext items={section.elementIds} strategy={horizontalListSortingStrategy}>
          {section.elementIds.map((elementId) => {
            const element = elementsById[elementId];
            return (
              <SortableElement key={elementId} elementId={elementId}>
                {BuilderElement(element)}
              </SortableElement>
            );
          })}
        </SortableContext>
      </section>
      {isSectionSelected && <SectionToolButton sectionId={section.id} isActive={isSectionSelected} />}
    </div>
  );
};

export default Section;
