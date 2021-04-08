import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

const listKey = "@eventList";
const defaultList = [
  {
    id: "1",
    body: {
      name: "Atualizações",
      isOn: true,
      topic: "atualizacoes",
    },
  },
  {
    id: "2",
    body: {
      name: "Promoções",
      isOn: false,
      topic: "promocoes",
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
      EventListService.updateEventsNotifications();

      return newList;
    } catch (error) {
      console.log(error);
    }
  },
  async updateEventsNotifications() {
    try {
      const eventList = await EventListService.getList();
      messaging().subscribeToTopic("all");

      eventList.forEach((event) => {
        if (event.body.isOn) {
          messaging().subscribeToTopic(event.body.topic);
        } else {
          messaging().unsubscribeFromTopic(event.body.topic);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
