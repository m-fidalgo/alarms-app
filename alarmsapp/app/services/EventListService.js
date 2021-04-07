import AsyncStorage from "@react-native-async-storage/async-storage";

const listKey = "@eventList";
const defaultList = [
  {
    id: "1",
    body: {
      name: "Atualizações",
      isOn: true,
    },
  },
  {
    id: "1",
    body: {
      name: "Promoções",
      isOn: false,
    },
  },
];

export const EventListService = {
  async getList() {
    try {
      const list = await AsyncStorage.getItem(listKey);

      if (list) {
        return JSON.parse(list);
      } else {
        return defaultList;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async setItem(newItem) {
    try {
      const lists = await EventListService.getList();
      const newList = list.map((item) => (item.id !== newItem.id ? item : newItem));
      AsyncStorage.setItem(listKey, JSON.stringify(newList));

      return newList;
    } catch (error) {
      console.log(error);
    }
  },
};
