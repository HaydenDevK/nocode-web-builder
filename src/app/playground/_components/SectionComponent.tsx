import type { TSection } from "@/app/model/types";
import styles from "../playground.module.scss";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SectionToolButton from "./SectionToolButton";
import ElementItem from "./ElementComponent";

const SectionComponent = ({ section }: { section: TSection }) => {
  const { elements, selectedItemInfo, setSelectedItemInfo } = useBuilderStore();
  const isActive = selectedItemInfo?.type === "section" && selectedItemInfo.itemId === section.id;

  return (
    <div className={styles.sectionWrap}>
      <button
        type="button"
        className={`${styles.section} ${isActive ? styles.active : ""}`}
        onClick={() => setSelectedItemInfo({ type: "section", itemId: section.id })}
      >
        <div className={styles.sectionContent}>
          <div className={styles.contentArea}>{section.id}</div>
          <SortableContext items={section.elementIds} strategy={horizontalListSortingStrategy}>
            <div className={styles.elementWrap}>
              {section.elementIds.map((elementId) => {
                const element = elements.byId[elementId];

                return <ElementItem key={elementId} element={element} />;
              })}
            </div>
          </SortableContext>
        </div>
      </button>
      {isActive && <SectionToolButton sectionId={section.id} isActive={isActive} />}
    </div>
  );
};

export default SectionComponent;
