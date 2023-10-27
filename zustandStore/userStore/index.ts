import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { OmsuGroupType, OmsuProfessorType } from "@/types";

type Store = {
  groupId: number | null;
  professorId: number | null;
  name: string | null;
  storeInfoAbout: (data: OmsuGroupType | OmsuProfessorType) => void;
  storeGroup: (id: number, name: string) => void;
  storeProfessor: (id: number, name: string) => void;
  reset: () => void;
};

function isGroup(
  data: OmsuGroupType | OmsuProfessorType
): data is OmsuGroupType {
  return (data as OmsuGroupType).course !== undefined;
}

export const useUserStore = create<Store>()(
  devtools(
    persist(
      immer((set, get) => ({
        professorId: null,
        groupId: null,
        course: null,
        name: null,
        reset: () => {
          set((state) => {
            state.groupId = null;
            state.professorId = null;
          });
        },
        storeInfoAbout: (data) =>
          set((state) => {
            if (isGroup(data)) {
              state.professorId = null;

              state.groupId = data.id;
              state.name = data.name;
            } else {
              state.groupId = null;

              state.name = data.name;
              state.professorId = data.id;
            }
          }),

        storeGroup: (id, name) =>
          set((state) => {
            state.professorId = null;
            state.name = name;

            state.groupId = id;
          }),

        storeProfessor: (id, name) =>
          set((state) => {
            state.professorId = id;
            state.name = name;

            state.groupId = null;
          }),
      })),
      { name: "userStore" }
    )
  )
);
