"use client";

import { useBuilderStore } from "@/app/store/useBuilderStore";
import Section from "@/components/Section";
import styles from "../styles/Canvas.module.scss";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useViewportStore } from "@/app/store/useViewportStore";

const Canvas: React.FC = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const sectionIds = useBuilderStore((s) => s.sections.allIds);
  const { sections, elements, moveElement } = useBuilderStore();
  const mode = useViewportStore((s) => s.mode);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    moveElement(activeId, overId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: mode === "desktop" ? "1024px" : "375px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div className={styles.canvas} id="canvas">
          {sectionIds.map((sectionId) => (
            <Section
              key={sectionId}
              section={sections.byId[sectionId]}
              elements={elements}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Canvas;
