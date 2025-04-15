"use client";

import React, { useState } from "react";
import styles from "./playground.module.scss";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

interface ISection {
  id: string;
  content: string;
}

export default function Page() {
  const [sections, setSections] = useState<ISection[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const addSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      content: `섹션 ${sections.length + 1}`,
    };
    setSections([...sections, newSection]);
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

  return (
    <div className={styles.container}>
      <button type="button" onClick={addSection} className={styles.addButton}>
        + 섹션 추가
      </button>

      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          className={`${styles.section} ${
            activeIndex === index ? styles.active : ""
          }`}
          onClick={() => setActiveIndex(index)}
        >
          <div className={styles.sectionContent}>
            <div className={styles.contentArea}>{section.content}</div>

            {activeIndex === index && (
              <div
                className={styles.actions}
                data-active={activeIndex === index}
              >
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
                    removeSection(index);
                  }}
                  className={styles.iconButton}
                >
                  <Trash2 />
                </button>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
