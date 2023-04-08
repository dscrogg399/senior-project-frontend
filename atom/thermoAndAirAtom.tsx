import { atom } from "recoil";
import { Thermostat } from "../types/Thermostat";
import { AirQuality } from "../types/AirQuality";

export const thermostatAtom = atom({
  key: "thermostatAtom",
  default: {
    current_temp: 72,
    target_temp: 72,
    min_temp: 60,
    max_temp: 80,
  } as Thermostat,
});

export const airQualityAtom = atom({
  key: "airQualityAtom",
  default: {
    co_level: 6,
    co2_level: 420,
    humidity: 0.55,
    pm_level: 0.5,
  } as AirQuality,
});
