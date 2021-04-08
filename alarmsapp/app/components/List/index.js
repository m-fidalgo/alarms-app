import React from "react";
import { View, FlatList } from "react-native";
import ListItem from "../ListItem";

export default function List(props) {
  const list = sortList(props.list) || [];

  function onRemove(item) {
    if (props.onRemove) {
      return props.onRemove(item);
    } else return false;
  }

  function sortList(list) {
    const newList = [...list].sort((a, b) => {
      return a.body.name > b.body.name ? 1 : -1;
    });

    return newList;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <ListItem item={item} onChange={props.onChange} onRemove={onRemove} />
        )}
      />
    </View>
  );
}
