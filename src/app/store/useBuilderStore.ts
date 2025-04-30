import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  TSection,
  TSectionProps,
  TElement,
  TSelectedItemInfo,
  TElementProps,
} from "../model/types";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";

export const INITIAL_SECTION_PROPS: TSectionProps = {
  backgroundColor: "transparent",
  desktopColumns: "1",
  mobileColumns: "1",
  paddingDesktopTopBottom: 15,
  paddingDesktopLeftRight: 15,
  paddingMobileTopBottom: 10,
  paddingMobileLeftRight: 10,
  columns: "1",
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
  moveSection(sectionId: string, tag: string): void;
  removeSection(sectionId: string): void;

  /* Element Action */
  addElement(element: Omit<TElement, "id">): string;
  updateElementProps(elementId: string, patch: Partial<TElementProps>): void;
  moveElement(activeId: string, overId: string): void;
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

    addSection: () =>
      set((state) => {
        const id = nanoid();

        state.sections.byId[id] = {
          id,
          props: { backgroundColor: "white" },
          elementIds: [],
        };

        state.sections.allIds.push(id);
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
        state.sections.allIds = state.sections.allIds.filter(
          (id) => id !== sectionId
        );

        for (const el in state.elements.byId) {
          if (state.elements.byId[el].sectionId === sectionId) {
            delete state.elements.byId[el];
          }
        }
        state.elements.allIds = state.elements.allIds.filter(
          (id) => state.elements.byId[id] !== undefined
        );
      }),

    /* Element Actions */
    addElement: (element: Omit<TElement, "id">) => {
      let newId = "";
      set((state) => {
        const id = nanoid();
        const { sectionId } = element;
        state.elements.byId[id] = { ...element, id };
        state.elements.allIds.push(id);
        state.sections.byId[sectionId].elementIds.push(id);
        newId = id;
      });
      return newId;
    },

    updateElementProps: (elementId, patch) =>
      set((state) => {
        Object.assign(state.elements.byId[elementId].props, patch);
      }),

    moveElement: (activeId, overId) => {
      set((state) => {
        const activeElement = state.elements.byId[activeId];
        const overElement = state.elements.byId[overId];

        // if (!activeElement || !overElement) return;

        const activeSectionId = activeElement.sectionId;
        const overSectionId = overElement.sectionId;

        if (activeSectionId === overSectionId) {
          const elementIds = state.sections.byId[activeSectionId].elementIds;
          const oldIndex = elementIds.indexOf(activeId);
          const newIndex = elementIds.indexOf(overId);

          if (oldIndex !== -1) {
            state.sections.byId[activeSectionId].elementIds = arrayMove(
              elementIds,
              oldIndex,
              newIndex
            );
          }
        }
        // 다른 섹션으로 이동
        else {
          const sourceElementIds =
            state.sections.byId[activeSectionId].elementIds;
          const targetElementIds =
            state.sections.byId[overSectionId].elementIds;

          const oldIndex = sourceElementIds.indexOf(activeId);
          if (oldIndex !== -1) {
            sourceElementIds.splice(oldIndex, 1);
          }

          const insertIndex = targetElementIds.indexOf(overId);
          const newIndex =
            insertIndex === -1 ? targetElementIds.length : insertIndex;
          targetElementIds.splice(newIndex, 0, activeId);

          state.elements.byId[activeId].sectionId = overSectionId;
        }
      });
    },

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
