"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import Section from "@/components/Section";
import styles from "../styles/Canvas.module.scss";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { builderElement } from "@/util/builderElement";

const Canvas: React.FC = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const sectionIds = useBuilderStore((s) => s.sections.allIds);
  const elementsById = useBuilderStore((s) => s.elements.byId);
  const [activeId, setActiveId] = useState<null | string>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    useBuilderStore.getState().moveElement(activeId, overId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sectionIds} strategy={horizontalListSortingStrategy}>
        <div className={styles.canvas}>
          {sectionIds.map((sectionId) => (
            <Section key={sectionId} sectionId={sectionId} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>{activeId && builderElement(elementsById[activeId])}</DragOverlay>
    </DndContext>
  );
};

export default Canvas;
