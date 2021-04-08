import { DataStore } from "./ApiService";
const collectionName = "alarms";

export const AlarmService = new DataStore(collectionName);
