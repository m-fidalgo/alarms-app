import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { AlarmService } from "./AlarmService";

let unsubscribeList = [];

function setConfigs() {
  PushNotification.configure({
    onNotification(notification) {
      console.log("NOTIFICAÇÃO: ", notification);

      if (notification && notification.userInteraction) {
        if (notification.action) {
          MessagesService.handleAction(notification.action, notification);
        }
      }
    },
  });
}

function setChannel() {
  PushNotification.channelExists("channel-id", function (exists) {
    if (!exists) {
      PushNotification.createChannel({
        channelId: "channel-id",
        channelName: "My channel",
      });
    }
  });
}

export const MessagesService = {
  async start() {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const granted = messaging().requestPermission();

      if (granted) {
        const token = await messaging().getToken();
        console.log(token);
        unsubscribeList.push(messaging().onMessage(MessagesService.handleMessage));
        setConfigs();
        setChannel();
      }
    } catch (error) {
      console.log(error);
    }
  },

  async handleMessage(remoteMsg) {
    console.log("MSG: ", remoteMsg);
    MessagesService.showNotification(remoteMsg);
  },

  handleBackgroundMessage() {
    messaging().setBackgroundMessageHandler(async (remoteMsg) => {
      console.log("BG: ", remoteMsg);
      MessagesService.showNotification(remoteMsg);
    });
  },

  showNotification(notification, configs) {
    PushNotification.localNotification({
      channelId: "channel-id",
      priority: "high",
      title: notification.data.title,
      message: notification.data.message,
      ...configs,
    });
  },

  scheduleNotification(notification, configs) {
    PushNotification.localNotificationSchedule({
      channelId: "channel-id",
      priority: "high",
      title: notification.title,
      message: notification.message,
      date: notification.date,
      id: notification.id,
      _id: notification._id,
      actions: '["Desativar"]',
      ...configs,
    });
  },

  async handleAction(action, notification) {
    if (action === "Desativar") {
      const alarmsList = await AlarmService.list();
      let alarm = alarmsList.find((item) => item.id === notification._id);

      console.log(alarm);

      if (alarm) {
        alarm.body.isOn = false;
        await AlarmService.update(alarm);
      }
    }
  },

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  },

  async finish() {
    unsubscribeList.forEach((func) => func());
    unsubscribeList = [];
  },
};
