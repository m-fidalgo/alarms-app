import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import List from "../../components/List";

const _list = [
  {
    id: "1",
    body: {
      name: "11:25",
      time: 1584109540833,
      isOn: true,
    },
  },
];

export default function Alarms() {
  const [list, setList] = useState(_list);

  function remove() {}

  function update() {}

  return (
    <View style={styles.view}>
      <List list={list} onRemove={remove} onChange={update} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
