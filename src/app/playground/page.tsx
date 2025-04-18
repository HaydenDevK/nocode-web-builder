"use client";

import { useState } from "react";
import styles from "./playground.module.scss";
import { ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import ElementItem from "./_components/ElementItem";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface IElement {
  id: string;
  content: string;
}

interface ISection {
  id: string;
  content: string;
  elements: IElement[];
}

export default function Page() {
  const [sections, setSections] = useState<ISection[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const addSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      content: `섹션 ${sections.length + 1}`,
      elements: [],
    };
    setSections([...sections, newSection]);
  };

  const addElement = () => {
    if (activeIndex === null) return;
    const sectionAddElements = [...sections];

    sectionAddElements[activeIndex].elements.push({
      id: crypto.randomUUID(),
      content: `${sectionAddElements[activeIndex].content} 아이템 ${
        sectionAddElements[activeIndex].elements.length + 1
      }`,
    });

    setSections(sectionAddElements);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
    if (activeIndex === index) setActiveIndex(null);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const updated = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setSections(updated);
    if (activeIndex === index) setActiveIndex(targetIndex);
    else if (activeIndex === targetIndex) setActiveIndex(index);
  };

  // 섹션 컨테이너 찾기
  const findSection = (id: string) => {
    const targetSection = sections.find((section) => section.elements.some((el) => el.id === id));
    return targetSection?.id;
  };

  // 드래그 오버시
  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeSectionId = findSection(activeId as string);
    const overSectionId = findSection(overId as string);

    if (!activeSectionId || !overSectionId) return;

    if (activeSectionId !== overSectionId) {
      setSections((prev) => {
        const activeSection = prev.find((section) => section.id === activeSectionId);
        const overSection = prev.find((section) => section.id === overSectionId);

        if (!activeSection || !overSection) return prev;

        const activeElementIndex = activeSection.elements.findIndex((el) => el.id === activeId);
        const overElementIndex = overSection.elements.findIndex((el) => el.id === overId);

        const newActiveElements = [...activeSection.elements];
        const [moved] = newActiveElements.splice(activeElementIndex, 1);

        const newOverElements = [...overSection.elements];
        const insertIndex = overElementIndex >= 0 ? overElementIndex : newOverElements.length;
        newOverElements.splice(insertIndex, 0, moved);

        return prev.map((section) => {
          if (section.id === activeSectionId) {
            return { ...section, elements: newActiveElements };
          }
          if (section.id === overSectionId) {
            return { ...section, elements: newOverElements };
          }
          return section;
        });
      });
    }
  };

  // 드래그 놓을때
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeSectionId = findSection(activeId as string);
    const overSectionId = findSection(overId as string);

    if (!activeSectionId || !overSectionId || activeSectionId !== overSectionId) return;

    setSections((prev) => {
      const section = prev.find((section) => section.id === activeSectionId);
      if (!section) return prev;

      const oldIndex = section.elements.findIndex((el) => el.id === activeId);
      const newIndex = section.elements.findIndex((el) => el.id === overId);

      if (oldIndex === newIndex) return prev;

      const newElements = arrayMove(section.elements, oldIndex, newIndex);

      return prev.map((sec) => (sec.id === section.id ? { ...sec, elements: newElements } : sec));
    });
  };

  function handleElementDelete(id: string) {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        elements: section.elements.filter((el) => el.id !== id),
      }))
    );
  }

  return (
    <div className={styles.container}>
      <button type="button" onClick={addSection} className={styles.addButton}>
        + 섹션 추가
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {sections.map((section, index) => (
          <div
            role="button"
            key={section.id}
            tabIndex={0}
            className={`${styles.section} ${activeIndex === index ? styles.active : ""}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActiveIndex(index);
            }}
          >
            <div className={styles.sectionContent}>
              <div className={styles.contentArea}>{section.content}</div>
              <div className={styles.actions} data-active={activeIndex === index}>
                {activeIndex === index && (
                  <div className={styles.actions} data-active={activeIndex === index}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(index, "up");
                      }}
                      className={styles.iconButton}
                    >
                      <ArrowUp />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(index, "down");
                      }}
                      className={styles.iconButton}
                    >
                      <ArrowDown />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addElement();
                      }}
                      className={styles.iconButton}
                    >
                      <Plus />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(index);
                      }}
                      className={styles.iconButton}
                    >
                      <Trash2 />
                    </button>
                  </div>
                )}
              </div>
              <SortableContext
                id={section.id}
                items={section.elements.map((el) => el.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className={styles.elementWrap}>
                  {section.elements.map((element, index) => (
                    <ElementItem
                      key={element.id}
                      id={element.id}
                      element={element}
                      index={index}
                      handleElementDelete={handleElementDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>
        ))}
      </DndContext>
    </div>
  );
}
