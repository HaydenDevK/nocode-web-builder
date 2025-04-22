import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TSection,
  TSectionProps,
  TElement,
  TTextProps,
  TImageProps,
  TVideoProps,
  TSelectedItemInfo,
  TElementProps,
} from "../model/types";

const INITIAL_SECTION_PROPS: TSectionProps = {
  backgroundColor: "transparent",
  padding: 0,
  radius: 0,
};

const INITIAL_SECTION_ID = "section-1";

const sampleTextId = "element-1";
const sampleImageId = "element-2";
const sampleVideoId = "element-3";

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

const sampleImage: TImageProps = {
  srcType: "url",
  imageURL:
    "https://cdn.pixabay.com/photo/2024/12/28/20/12/trees-9296828_1280.jpg",
  width: 100,
  align: "center",
  link: "",
  radius: 12,
};

const sampleVideo: TVideoProps = {
  videoSrcType: "youtube",
  videoURL: "https://www.youtube.com/watch?v=ieZi8Q-eVSQ",
  width: 100,
};

interface BuilderState {
  sections: {
    byId: Record<string, TSection>;
    allIds: string[];
  };
  elements: {
    byId: Record<string, TElement>;
    allIds: string[];
  };

  selectedItemInfo: TSelectedItemInfo;
  setSelectedItemInfo(info: TSelectedItemInfo): void;

  addSection(): void;
  updateSectionProps(sectionId: string, patch: Partial<TSectionProps>): void;
  moveSection(): void;
  removeSection(sectionId: string): void;

  addElement(): void;
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
          elementIds: [sampleTextId, sampleImageId, sampleVideoId],
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
        [sampleImageId]: {
          id: sampleImageId,
          sectionId: INITIAL_SECTION_ID,
          type: "image",
          props: sampleImage,
        },
        [sampleVideoId]: {
          id: sampleVideoId,
          sectionId: INITIAL_SECTION_ID,
          type: "video",
          props: sampleVideo,
        },
      },
      allIds: [sampleTextId, sampleImageId, sampleVideoId],
    },

    selectedItemInfo: { type: "text", itemId: sampleTextId },
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

    addElement: () => {},
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
