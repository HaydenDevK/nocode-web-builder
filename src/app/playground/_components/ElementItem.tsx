import styles from "../playground.module.scss";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

interface ISectionItemProps {
  index: number;
  id: string;
  element: { id: string; content: string };
  handleElementDelete: (id: string) => void;
}

export default function ElementItem({ index, id, element, handleElementDelete }: ISectionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const [elementActive, setElementActive] = useState<number | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleElementClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setElementActive(index);
  };

  return (
    <div
      ref={setNodeRef}
      key={element.id}
      style={style}
      className={`${styles.element} ${elementActive === index ? styles.active : ""}`}
      onClick={handleElementClick}
      {...attributes}
      {...listeners}
    >
      <div className={styles.sectionContent}>
        <div className={styles.contentArea}>{element.content}</div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleElementDelete(element.id);
            }}
            className={styles.iconButton}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
