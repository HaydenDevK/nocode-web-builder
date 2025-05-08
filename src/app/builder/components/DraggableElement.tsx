import { CSS } from "@dnd-kit/utilities";
import { Move } from "lucide-react";
import styles from "../../builder/styles/Canvas.module.scss";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const DraggableElement = ({
  children,
  elementId,
}: {
  children: React.ReactNode;
  elementId: string;
}) => {
  const selectedItemInfo = useBuilderStore((s) => s.selectedItemInfo);
  const isSelected = selectedItemInfo?.itemId === elementId;

  const {
    setNodeRef: dragRef,
    attributes,
    listeners,
    transform,
    isDragging,
  } = useDraggable({ id: elementId });

  const { setNodeRef: dropRef } = useDroppable({ id: elementId });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <div
      ref={(el) => {
        dragRef(el);
        dropRef(el);
      }}
      style={style}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          width: "100%",
        }}
      >
        {children}
        {elementId && isSelected && (
          <button
            type="button"
            className={styles.iconButton}
            {...attributes}
            {...listeners}
          >
            <Move />
          </button>
        )}
      </div>
    </div>
  );
};

export default DraggableElement;
