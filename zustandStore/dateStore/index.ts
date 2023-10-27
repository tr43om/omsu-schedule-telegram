import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { getCurrentWeek } from "../../utils/index";
import { toDate, add, startOfWeek } from "date-fns";

type Store = {
  selectedDate: number;
  selectDate: (date: number) => void;
  currentWeek: number;
  currentWeekday: string;
  nextWeek: () => void;
  prevWeek: () => void;
};

export const useDateStore = create<Store>()(
  devtools(
    immer((set, get) => ({
      selectedDate: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      nextWeek: () => {
        set((state) => {
          const nextW = startOfWeek(add(get().selectedDate, { weeks: 1 }), {
            weekStartsOn: 1,
          }).getTime();
          state.selectedDate = nextW;

          state.currentWeek = getCurrentWeek(new Date(nextW));
        });
      },
      prevWeek: () => {
        set((state) => {
          const nextW = startOfWeek(add(get().selectedDate, { weeks: -1 }), {
            weekStartsOn: 1,
          }).getTime();
          state.selectedDate = nextW;

          state.currentWeek = getCurrentWeek(new Date(nextW));
        });
      },
      currentWeek: getCurrentWeek(new Date()),
      currentWeekday: "понедельник",
      selectDate: (date) => {
        set((state) => {
          state.currentWeekday = toDate(date)
            .toLocaleDateString("ru-Ru", { weekday: "long" })
            .split(",")[0]
            .toLowerCase();

          state.selectedDate = date;
          state.currentWeek = getCurrentWeek(new Date(date));
        });
      },
    }))
  )
);
