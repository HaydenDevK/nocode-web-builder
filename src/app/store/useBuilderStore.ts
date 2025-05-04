import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TSection, TSectionProps, TElement, TSelectedItemInfo, TElementProps } from "../model/types";
import { nanoid } from "nanoid";

export const INITIAL_SECTION_PROPS: TSectionProps = {
  backgroundColor: "transparent",
  paddingDesktopTopBottom: 15,
  paddingDesktopLeftRight: 30,
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
  initializeSectionGrid(sectionId: string, newColumns: string): boolean;

  /* Element Action */
  addElement(element: Omit<TElement, "id">): string;
  updateElementProps(elementId: string, patch: Partial<TElementProps>): void;
  moveElement: (activeId: string, overId: string) => void;
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
          props: {
            backgroundColor: "white",
            paddingDesktopTopBottom: 15,
            paddingDesktopLeftRight: 30,
            paddingMobileTopBottom: 10,
            paddingMobileLeftRight: 10,
            columns: "1",
          },
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
        state.sections.allIds = state.sections.allIds.filter((id) => id !== sectionId);

        for (const el in state.elements.byId) {
          if (state.elements.byId[el].sectionId === sectionId) {
            delete state.elements.byId[el];
          }
        }
        state.elements.allIds = state.elements.allIds.filter((id) => state.elements.byId[id] !== undefined);
      }),

    initializeSectionGrid: (sectionId: string, newColumns: string) => {
      let success = false;
      set((state) => {
        const section = state.sections.byId[sectionId];
        const columnCount = newColumns.split("-").length;
        const checkElement = section.elementIds.filter((id) => !id.startsWith("empty"));
        const emptyElement = section.elementIds.filter((id) => id.startsWith("empty"));

        // 설정하려는 칸 수보다 요소 수가 많으면 설정 불가능
        if (columnCount > 1 && checkElement.length > columnCount) return;

        section.props.columns = newColumns;

        const emptyCount = columnCount - checkElement.length;
        const columnEmptyElement = emptyElement.slice(0, emptyCount);

        for (const id of emptyElement.slice(emptyCount)) {
          delete state.elements.byId[id];
        }

        section.elementIds = [...checkElement, ...columnEmptyElement];
        const addEmptyCount = emptyCount - columnEmptyElement.length;
        if (addEmptyCount > 0) {
          const emptyIds = Array.from({ length: addEmptyCount }, () => `empty-${nanoid()}`);
          for (const id of emptyIds) {
            if (!state.elements.byId[id]) {
              state.elements.byId[id] = {
                id,
                sectionId,
                type: "empty",
                props: { backgroundColor: "white" },
              };
            }
          }
          section.elementIds.push(...emptyIds);
        }
        success = true;
      });

      return success;
    },

    /* Element Actions */
    addElement: (element: Omit<TElement, "id">) => {
      let newId = "";
      set((state) => {
        const id = nanoid();
        const { sectionId } = element;
        const section = state.sections.byId[sectionId];
        const checkSectionColumns = section.props.columns.split("-").length;

        // 그리드 칸 수에 요소가 전부 채워지면 요소 추가 불가능
        if (section.elementIds.filter((id) => !id.startsWith("empty")).length >= checkSectionColumns) return;

        state.elements.byId[id] = { ...element, id };
        state.elements.allIds.push(id);

        const emptyIndex = section.elementIds.findIndex((id) => id.startsWith("empty"));
        if (emptyIndex !== -1) {
          section.elementIds[emptyIndex] = id;
        } else {
          section.elementIds.push(id);
        }

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

        if (!activeElement || !overElement) return;

        const activeSection = state.sections.byId[activeElement.sectionId];
        const overSection = state.sections.byId[overElement.sectionId];

        const activeIndex = activeSection.elementIds.indexOf(activeId);
        const overIndex = overSection.elementIds.indexOf(overId);

        if (activeIndex === -1 || overIndex === -1) return;

        [activeSection.elementIds[activeIndex], overSection.elementIds[overIndex]] = [
          overSection.elementIds[overIndex],
          activeSection.elementIds[activeIndex],
        ];

        state.elements.byId[activeId].sectionId = overSection.id;
        state.elements.byId[overId].sectionId = activeSection.id;
      });
    },

    removeElement: (elementId) =>
      set((state) => {
        const element = state.elements.byId[elementId];
        const sec = state.sections.byId[element.sectionId];

        const deleteElementIndex = sec.elementIds.findIndex((id) => id === elementId);

        sec.elementIds.splice(deleteElementIndex, 1);
        delete state.elements.byId[elementId];
        state.elements.allIds = state.elements.allIds.filter((id) => id !== elementId);

        const emptyId = `empty-${nanoid()}`;
        sec.elementIds.splice(deleteElementIndex, 0, emptyId);

        state.elements.byId[emptyId] = {
          id: emptyId,
          sectionId: element.sectionId,
          type: "empty",
          props: { backgroundColor: "white" },
        };

        state.elements.allIds = [...state.elements.allIds, emptyId];
        state.selectedItemInfo = null;
      }),
  }))
);
