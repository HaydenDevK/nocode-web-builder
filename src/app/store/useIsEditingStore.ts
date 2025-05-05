"use client";

import { create } from "zustand";

interface IIsEditingStore {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useIsEditingStore = create<IIsEditingStore>((set) => ({
  isEditing: true,
  setIsEditing: (isEditing) =>
    set(() => ({
      isEditing: isEditing,
    })),
}));
