import { create } from "zustand";

type ViewportMode = "desktop" | "mobile";

interface IViewportStore {
  mode: ViewportMode;
  setMode: (mode: ViewportMode) => void;
  toggleMode: () => void;
}

export const useViewportStore = create<IViewportStore>((set) => ({
  mode: "desktop",
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "desktop" ? "mobile" : "desktop",
    })),
}));
