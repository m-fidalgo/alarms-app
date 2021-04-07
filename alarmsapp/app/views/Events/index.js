import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import List from "../../components/List";
import { EventListService } from "../../services/EventListService";

export default function Events() {
  const [list, setList] = useState([]);

  useEffect(() => {
    EventListService.getList().then(setList);
  }, []);

  function update(item) {
    EventListService.setItem(item).then(setList);
  }

  return (
    <View>
      <Text style={styles.title}>Eventos</Text>
      <List list={list} onChange={update} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    marginVertical: 10,
  },
});
