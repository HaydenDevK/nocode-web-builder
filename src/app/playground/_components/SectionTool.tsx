import { useBuilderStore } from "@/app/store/useBuilderStore";
import styles from "../playground.module.scss";
import { ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import { DEFAULT_TEXT_PROPS } from "@/constants/defaultElementProps";

const SectionTool = ({ sectionId, isActive }: { sectionId: string; isActive: boolean }) => {
  const { addElement, moveSection, removeSection } = useBuilderStore();

  return (
    <div className={styles.actions} data-active={isActive}>
      <button type="button" onClick={() => moveSection(sectionId, "up")} className={styles.iconButton}>
        <ArrowUp />
      </button>
      <button type="button" onClick={() => moveSection(sectionId, "down")} className={styles.iconButton}>
        <ArrowDown />
      </button>
      <button
        type="button"
        onClick={() =>
          addElement({
            sectionId: sectionId,
            type: "text",
            props: DEFAULT_TEXT_PROPS,
          })
        }
        className={styles.iconButton}
      >
        <Plus />
      </button>
      <button type="button" onClick={() => removeSection(sectionId)} className={styles.iconButton}>
        <Trash2 />
      </button>
    </div>
  );
};

export default SectionTool;
