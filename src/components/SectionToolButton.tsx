import { useBuilderStore } from "@/app/store/useBuilderStore";
import styles from "./sectionToolButton.module.scss";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

const SectionToolButton = ({ sectionId, isActive }: { sectionId: string; isActive: boolean }) => {
  const { moveSection, removeSection } = useBuilderStore();

  return (
    <div className={styles.actions} data-active={isActive}>
      <button type="button" onClick={() => moveSection(sectionId, "up")} className={styles.iconButton}>
        <ArrowUp />
      </button>
      <button type="button" onClick={() => moveSection(sectionId, "down")} className={styles.iconButton}>
        <ArrowDown />
      </button>
      <button type="button" onClick={() => removeSection(sectionId)} className={styles.iconButton}>
        <Trash2 />
      </button>
    </div>
  );
};

export default SectionToolButton;
