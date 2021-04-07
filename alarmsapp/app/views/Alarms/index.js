import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import List from "../../components/List";
import { AlarmService } from "../../services/AlarmService";

export default function Alarms() {
  const [list, setList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    const unsub = AlarmService.watch(setList);

    return () => unsub();
  }, []);

  function remove(item) {
    AlarmService.remove(item.id);
  }

  function update(item) {
    AlarmService.update(item);
  }

  function onChangeDate(event, selectedDate) {
    setShowDate(false);

    if (selectedDate) {
      setDate(selectedDate);
      create(selectedDate);
    }
  }

  function create(time) {
    const name = formatTime(time);
    time.setSeconds(0);

    if (!list.find((item) => item.body.name == name)) {
      AlarmService.create({
        name,
        isOn: true,
        time: time.getTime(),
      });
    }
  }

  function formatTime(time) {
    const hour = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minutes}`;
  }

  return (
    <View style={styles.view}>
      <Button title="Novo Alarme" onPress={() => setShowDate(true)} color="#099bbd" />
      <List list={list} onRemove={remove} onChange={update} />
      {showDate && (
        <DateTimePicker
          value={date}
          is24Hour={true}
          mode={"time"}
          display={"spinner"}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
