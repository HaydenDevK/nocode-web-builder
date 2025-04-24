import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TSection,
  TSectionProps,
  TElement,
  TSelectedItemInfo,
  TElementProps,
} from "../model/types";
import { nanoid } from "nanoid";

const INITIAL_SECTION_PROPS: TSectionProps = {
  backgroundColor: "transparent",
  padding: 0,
  radius: 0,
};

const INITIAL_SECTION_ID = "section-1";

interface BuilderState {
  sections: {
    byId: Record<string, TSection>;
    allIds: string[];
  };
  elements: {
    byId: Record<string, TElement>;
    allIds: string[];
  };

  selectedItemInfo: TSelectedItemInfo | null;
  setSelectedItemInfo(info: TSelectedItemInfo): void;

  addSection(): void;
  updateSectionProps(sectionId: string, patch: Partial<TSectionProps>): void;
  moveSection(): void;
  removeSection(sectionId: string): void;

  /* Element Action */
  addElement(element: Omit<TElement, "id">): void;
  updateElementProps(elementId: string, patch: Partial<TElementProps>): void;
  moveElement(): void;
  removeElement(elementId: string): void;
}

export const useBuilderStore = create<BuilderState>()(
  immer((set) => ({
    sections: {
      byId: {
        [INITIAL_SECTION_ID]: {
          id: INITIAL_SECTION_ID,
          props: INITIAL_SECTION_PROPS,
          elementIds: [],
        },
      },
      allIds: [INITIAL_SECTION_ID],
    },
    elements: {
      byId: {},
      allIds: [],
    },

    selectedItemInfo: null,
    setSelectedItemInfo: (info) =>
      set((state) => {
        state.selectedItemInfo = info;
      }),

    addSection: () => {},
    updateSectionProps: (sectionId, patch) =>
      set((state) => {
        Object.assign(state.sections.byId[sectionId].props, patch);
      }),
    moveSection: () => {},
    removeSection: () => {},

    /* Element Actions */
    addElement: (element: Omit<TElement, "id">) =>
      set((state) => {
        if (state.selectedItemInfo?.type !== "section") return;

        const { sectionId } = element;
        const id = nanoid();
        state.elements.byId[id] = { ...element, id };
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
