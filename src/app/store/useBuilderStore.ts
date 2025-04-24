import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TSection, TSectionProps, TElement, TTextProps, TSelectedItemInfo, TElementProps } from "../model/types";

const INITIAL_SECTION_PROPS: TSectionProps = {
  backgroundColor: "white",
  padding: 0,
  radius: 0,
};

const INITIAL_SECTION_ID = crypto.randomUUID();

export const sampleText: TTextProps = {
  text: "Sample Text",
  size: "h1",
  fontFamily: "sans-serif",
  fontWeight: "normal",
  color: "#000000",
  backgroundColor: "transparent",
  padding: 0,
  radius: 0,
};

const sampleTextId = crypto.randomUUID();

interface BuilderState {
  sections: {
    byId: Record<string, TSection>;
    allIds: string[];
  };
  elements: {
    byId: Record<string, TElement>;
    allIds: string[];
  };

  /* 현재 선택된 항목 */
  selectedItemInfo: TSelectedItemInfo;
  setSelectedItemInfo(info: TSelectedItemInfo): void;

  /* Section Action */
  addSection(): void;
  updateSectionProps(sectionId: string, patch: Partial<TSectionProps>): void;
  moveSection(sectionId: string, tag: string): void;
  removeSection(sectionId: string): void;

  /* Element Action */
  addElement(sectionId: string, elementType: TElementProps, props: TTextProps): void;
  updateElementProps(elementId: string, patch: Partial<TElementProps>): void;
  moveElement(): void;
  removeElement(elementId: string): void;
}

export const useBuilderStore = create<BuilderState>()(
  immer((set) => ({
    /* 초기 값 */
    sections: {
      byId: {
        [INITIAL_SECTION_ID]: {
          id: INITIAL_SECTION_ID,
          props: INITIAL_SECTION_PROPS,
          elementIds: [sampleTextId],
        },
      },
      allIds: [INITIAL_SECTION_ID],
    },
    elements: {
      byId: {
        [sampleTextId]: {
          id: sampleTextId,
          sectionId: INITIAL_SECTION_ID,
          type: "text",
          props: sampleText,
        },
      },
      allIds: [sampleTextId],
    },

    selectedItemInfo: { type: "text", itemId: sampleTextId },
    setSelectedItemInfo: (info) =>
      set((state) => {
        state.selectedItemInfo = info ?? null;
      }),

    /* Section Actions */
    addSection: () =>
      set((state) => {
        const sectionId = crypto.randomUUID();

        state.sections.byId[sectionId] = {
          id: sectionId,
          props: { backgroundColor: "white" },
          elementIds: [],
        };

        state.sections.allIds.push(sectionId);
      }),

    updateSectionProps: (sectionId, patch) =>
      set((state) => {
        Object.assign(state.sections.byId[sectionId].props, patch);
      }),

    moveSection: (sectionId, tag) =>
      set((state) => {
        const idx = state.sections.allIds.indexOf(sectionId);
        if (idx === -1) return;

        const targetIdx = tag === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= state.sections.allIds.length) return;

        const arr = state.sections.allIds;
        [arr[idx], arr[targetIdx]] = [arr[targetIdx], arr[idx]];
      }),

    removeSection: (sectionId) =>
      set((state) => {
        delete state.sections.byId[sectionId];
        state.sections.allIds = state.sections.allIds.filter((id) => id !== sectionId);

        for (const el in state.elements.byId) {
          if (state.elements.byId[el].sectionId === sectionId) {
            delete state.elements.byId[el];
          }
        }
        state.elements.allIds = state.elements.allIds.filter((id) => state.elements.byId[id] !== undefined);
      }),

    /* Element Actions */
    addElement: (sectionId: string, elementType: TElementProps, props: TTextProps) =>
      set((state) => {
        if (!state.sections.byId[sectionId]) return;

        const elementId = crypto.randomUUID();

        // 요소 생성
        state.elements.byId[elementId] = {
          id: elementId,
          sectionId,
          type: elementType,
          props: props,
        };

        // allIds 배열에 새 요소 ID 추가
        state.elements.allIds.push(elementId);

        // 해당 섹션의 elementIds 배열에 새 요소 ID 추가
        state.sections.byId[sectionId].elementIds.push(elementId);
      }),

    updateElementProps: (elementId, patch) =>
      set((state) => {
        Object.assign(state.elements.byId[elementId].props, patch);
      }),

    moveElement: () => {},

    removeElement: (elementId) =>
      set((state) => {
        const element = state.elements.byId[elementId];
        const sec = state.sections.byId[element.sectionId];

        sec.elementIds = sec.elementIds.filter((id) => id !== elementId);
        delete state.elements.byId[elementId];
        state.elements.allIds = state.elements.allIds.filter((id) => id !== elementId);
        state.selectedItemInfo = null;
      }),
  }))
);
