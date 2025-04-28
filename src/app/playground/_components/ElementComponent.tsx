import type { TElement } from "@/app/model/types";
import styles from "../playground.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TElementProps {
  element: TElement;
}

export default function ElementItem({ element }: TElementProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} key={element.id} style={style} className={styles.element} {...attributes} {...listeners}>
      <div className={styles.elementContent}>
        <div className={styles.contentArea}>{element.id}</div>
      </div>
    </div>
  );
}
