import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import Alarms from "../Alarms";
import Events from "../Events";
import { MessagesService } from "../../services/MessagesService";

export default function Main(props) {
  const [isEventsViewOn, setIsEventsViewOn] = useState(false);

  useEffect(() => {
    MessagesService.start();

    return () => {
      MessagesService.finish();
    };
  }, []);

  function logout() {
    auth().signOut();
    props.onLogout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>{isEventsViewOn ? <Events /> : <Alarms />}</View>
      <View style={styles.btnsContainer}>
        <Button title="Alarmes" onPress={() => setIsEventsViewOn(false)} />
        <Button title="Eventos" onPress={() => setIsEventsViewOn(true)} />
        <Button title="Logout" onPress={logout} color="#ff2724" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4c11b0",
    width: "100%",
  },
  viewContainer: {
    flex: 1,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, .3)",
  },
});
