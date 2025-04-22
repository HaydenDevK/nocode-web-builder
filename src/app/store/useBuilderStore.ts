import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TSection,
  TSectionProps,
  TElement,
  TTextProps,
  TSelectedItemInfo,
  TElementProps,
} from "../model/types";

const INITIAL_SECTION_PROPS: TSectionProps = {
  backgroundColor: "transparent",
  padding: 0,
  radius: 0,
};

const INITIAL_SECTION_ID = "section-1";

const sampleText: TTextProps = {
  text: "Sample Text",
  size: "h1",
  fontFamily: "sans-serif",
  fontWeight: "normal",
  color: "#000000",
  backgroundColor: "transparent",
  padding: 0,
  radius: 0,
};

const sampleTextId = "element-1";

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
  moveSection(): void;
  removeSection(sectionId: string): void;

  /* Element Action */
  addElement(element: TElement): void;
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
        state.selectedItemInfo = info;
      }),

    /* Section Actions */
    addSection: () => {},

    updateSectionProps: (sectionId, patch) =>
      set((state) => {
        Object.assign(state.sections.byId[sectionId].props, patch);
      }),

    moveSection: () => {},

    removeSection: () => {},

    /* Element Actions */
    addElement: (element: TElement) =>
      set((state) => {
        const { id, sectionId } = element;
        state.elements.byId[id] = element;
        state.elements.allIds.push(id);
        state.sections.byId[sectionId].elementIds.push(id);
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
        state.elements.allIds = state.elements.allIds.filter(
          (id) => id !== elementId
        );
        state.selectedItemInfo = null;
      }),
  }))
);
