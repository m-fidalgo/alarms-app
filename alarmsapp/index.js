import { AppRegistry } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";
import { EventListService } from "./app/services/EventListService";
import { MessagesService } from "./app/services/MessagesService";

AppRegistry.registerComponent(appName, () => App);
MessagesService.handleBackgroundMessage();
EventListService.updateEventsNotifications();
