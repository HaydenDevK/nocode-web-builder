import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import styles from "../../builder/styles/Canvas.module.scss";
import { useBuilderStore } from "@/app/store/useBuilderStore";

const SortableElement = ({
  children,
  elementId,
}: {
  children: React.ReactNode;
  elementId: string;
}) => {
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const isSelected = selectedItemInfo?.itemId === elementId;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: elementId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className={styles.elementDragHandle}>
        {children}
        {isSelected && (
          <button
            type="button"
            className={styles.iconButton}
            {...attributes}
            {...listeners}
          >
            <GripVertical />
          </button>
        )}
      </div>
    </div>
  );
};

export default SortableElement;
