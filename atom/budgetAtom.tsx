import { atom } from "recoil";
import { Budget } from "../types/Budget";

export const budgetAtom = atom({
  key: "budgetAtom",
  default: {
    id: 1,
    max_cost: 100,
    max_energy: 800,
    max_water: 7500,
    created_at: "2021-07-01T00:00:00.000Z",
    is_active: true,
  } as Budget,
});
