// elements.store.ts
import { create } from "zustand";
import { CreateElement } from "@/app/builder/types/createElementTypes";

interface ElementsStore {
  elements: CreateElement[];

  // 요소 추가
  addElement: (element: CreateElement) => void;

  // 요소 속성 업데이트
  updateElementProps: (id: string, newProps: Record<string, any>) => void;
}

export const useElementStore = create<ElementsStore>((set) => ({
  elements: [],

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  updateElementProps: (id, newProps) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...newProps } : el
      ),
    })),
}));
