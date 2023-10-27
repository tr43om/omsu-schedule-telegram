import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import {
  OmsuGroupType,
  OmsuProfessorType,
  RecentType,
  FavoriteType,
} from "types";
import { useUserStore } from "../userStore";

type Store = {
  query: string;
  setQuery: (q: string) => void;
  isOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  chooseQuery: (query: OmsuGroupType | OmsuProfessorType) => void;
  recents: RecentType[];
  deleteFromRecents: (id: number) => void;
  deleteFromFavorites: (id: number) => void;
  addToRecents: (
    query: OmsuGroupType | OmsuProfessorType | RecentType | FavoriteType,
    type: "group" | "professor"
  ) => void;
  addToFavorites: (query: OmsuGroupType | OmsuProfessorType) => void;
  isDuplicate: (query: OmsuGroupType | OmsuProfessorType) => void;
  favorites: FavoriteType[];
};

export const useSearchStore = create<Store>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          query: "",
          recents: [],
          favorites: [],
          isOpen: false,
          setQuery: (q) =>
            set((state) => {
              state.query = q;
            }),
          isDuplicate: (query) => {
            // 1. Check if group exists in favorites or recents arrays
            const duplicateInRecents = get().recents.every(
              (item) => item.id !== query.id
            );

            const duplicateInFavorites = get().favorites.every(
              (item) => item.id !== query.id
            );

            return duplicateInRecents && duplicateInFavorites;
          },
          chooseQuery: (query) => {
            get().closeSearch();
            useUserStore.getState().storeInfoAbout(query);
            const type = "course" in query ? "group" : "professor";
            get().addToRecents(query, type);
            set((state) => {
              state.query = "";
            });
          },
          toggleSearch: () =>
            set((state) => {
              state.isOpen = !state.isOpen;
              state.query = "";
            }),
          closeSearch: () =>
            set((state) => {
              state.isOpen = false;
              state.query = "";
            }),

          deleteFromRecents: (id) => {
            set((state) => {
              const recent = state.recents.find(
                (recent) => recent.id === id
              ) as RecentType;
              state.recents.splice(state.recents.indexOf(recent), 1);
            });
          },

          addToRecents: (query, type) => {
            // 1. Check if group exists in favorites or recents arrays
            const duplicate = get().recents.find(
              (item) => item.id === query.id
            );

            const existsInRecents = Boolean(duplicate);

            const existsInFavorites = get().favorites.some(
              (item) => item.id === query.id
            );

            if (existsInRecents) {
              get().deleteFromRecents(query.id);
            }

            set((state) => {
              // 2. If there is no duplicate in recents and favorites, add to recents
              if (!existsInRecents && !existsInFavorites) {
                state.recents.unshift({ ...query, type });
                // 3. If there are more than 4 recents displayed, delete the last one
              } else if (state.recents.length >= 5) {
                state.recents.pop();
                // 4. If recent already exists in array, move it to the first place
              } else if (existsInRecents) {
                state.recents.unshift(duplicate as RecentType);
              }
            });
          },

          addToFavorites: (group) => {
            // 1. Delete from recents
            get().deleteFromRecents(group.id);

            set((state) => {
              // 2. Add to favorites if unique
              if (!state.favorites.find((item) => item.id === group.id)) {
                state.favorites.unshift(group);
              }
            });
          },

          deleteFromFavorites: (id) => {
            const favorite = get().favorites.find(
              (recent) => recent.id === id
            ) as OmsuGroupType;
            set((state) => {
              state.favorites.splice(state.favorites.indexOf(favorite), 1);
            });
          },
        }),

        {
          name: "searchStore",
          partialize: (state) => ({
            recents: state.recents,
            favorites: state.favorites,
          }),
        }
      )
    )
  )
);
