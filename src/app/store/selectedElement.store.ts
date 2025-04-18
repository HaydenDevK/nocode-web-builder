import { create } from "zustand";
import type { TElementType } from "../model/types";

interface SelectedElementState {
  selectedType: TElementType | null;
  selectedId: string | null;
  // 해당 element에 맞는 편집 기능들 타입이 정해진게 없어서 우선 any로 지정해두었습니다.
  elementProps: Record<string, any>;
  setSelectedType: (type: TElementType | null, id?: string) => void;
  setElementProps: (props: Record<string, any>) => void;
  updateElementProp: (key: string, value: any) => void;
  clearSelectedType: () => void;
}

export const useSelectedElementStore = create<SelectedElementState>((set) => ({
  selectedType: null,
  selectedId: null,
  elementProps: {},

  // 선택된 요소의 타입과 ID를 설정
  setSelectedType: (type, id) => set({ selectedType: type, selectedId: id }),
  // 선택된 요소의 전체 속성을 한 번에 설정
  setElementProps: (props) => set({ elementProps: props }),
  // 요소의 특정 속성만 업데이트
  updateElementProp: (key, value) =>
    set((state) => ({
      elementProps: {
        ...state.elementProps,
        [key]: value,
      },
    })),
  // 선택 상태 초기화
  clearSelectedType: () =>
    set({
      selectedType: null,
      selectedId: null,
      elementProps: {},
    }),
}));
