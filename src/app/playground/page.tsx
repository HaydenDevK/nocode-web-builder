"use client";

import styles from "./playground.module.scss";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { useBuilderStore } from "../store/useBuilderStore";
import { arrayMove } from "@dnd-kit/sortable";
import SectionComponent from "./_components/SectionComponent";

export default function Page() {
  const sensors = useSensors(useSensor(PointerSensor));
  const { sections, addSection } = useBuilderStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();
    const state = useBuilderStore.getState();

    const activeElement = state.elements.byId[activeId];
    const overElement = state.elements.byId[overId];
    const activeSectionId = activeElement.sectionId;
    const overSectionId = overElement.sectionId;

    if (!activeElement || !overElement) return;

    useBuilderStore.setState((state) => {
      // 같은 섹션 이동
      if (activeSectionId === overSectionId) {
        const activeElementSection = state.sections.byId[activeSectionId].elementIds;
        const oldIndex = activeElementSection.indexOf(activeId);
        const newIndex = activeElementSection.indexOf(overId);

        if (oldIndex !== -1) {
          state.sections.byId[activeSectionId].elementIds = arrayMove(activeElementSection, oldIndex, newIndex);
        }
      }
      // 다른 섹션 이동
      else {
        if (activeSectionId !== overSectionId) {
          const activeElementSection = state.sections.byId[activeSectionId].elementIds;
          const newElementSection = state.sections.byId[overSectionId].elementIds;

          const oldIndex = activeElementSection.indexOf(activeId);
          if (oldIndex !== -1) {
            activeElementSection.splice(oldIndex, 1);
          }

          const insertIndex = newElementSection.indexOf(overId);
          const newIndex = insertIndex === -1 ? newElementSection.length : insertIndex;
          newElementSection.splice(newIndex, 0, activeId);

          state.elements.byId[activeId].sectionId = overSectionId;
        }
      }
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const state = useBuilderStore.getState();
    const activeElement = state.elements.byId[activeId];
    const overElement = state.elements.byId[overId];

    if (!activeElement || !overElement) return;

    const activeSectionId = activeElement.sectionId;
    const overSectionId = overElement.sectionId;

    // 다른 섹션일 경우
    if (activeSectionId !== overSectionId) {
      const overElementSection = state.sections.byId[overSectionId].elementIds;

      if (overElementSection.includes(activeId)) return;

      useBuilderStore.setState((state) => {
        const activeElementSection = state.sections.byId[activeSectionId].elementIds;
        const overElementSection = state.sections.byId[overSectionId].elementIds;

        const oldIndex = activeElementSection.indexOf(activeId);
        if (oldIndex !== -1) activeElementSection.splice(oldIndex, 1);

        const insertIndex = overElementSection.indexOf(overId);
        const newIndex = insertIndex === -1 ? overElementSection.length : insertIndex;
        overElementSection.splice(newIndex, 0, activeId);

        state.elements.byId[activeId].sectionId = overSectionId;
      });
    }
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={addSection} className={styles.addButton}>
        + 섹션 추가
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        {sections.allIds.map((id) => {
          const section = sections.byId[id];
          return <SectionComponent key={id} section={section} />;
        })}
      </DndContext>
    </div>
  );
}
