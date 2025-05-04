"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import Section from "@/components/Section";
import styles from "../styles/Canvas.module.scss";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";

export interface IDragViewState {
  activeId: string | null;
  overId: string | null;
  isDragging: boolean;
  overSectionId: string | null;
}

const Canvas: React.FC = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const sectionIds = useBuilderStore((s) => s.sections.allIds);
  const { sections, elements, moveElement } = useBuilderStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    moveElement(activeId, overId);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {sectionIds.map((sectionId) => (
          <Section key={sectionId} section={sections.byId[sectionId]} elements={elements} />
        ))}
      </div>
    </DndContext>
  );
};

export default Canvas;
