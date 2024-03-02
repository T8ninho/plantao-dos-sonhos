import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

export default function SelectDate ({ onDateChange, initialDate, children }) {
  const [date, setDate] = useState(initialDate || new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onDateChange(currentDate)
  };

  function showDatepicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };
  
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker} style={{flexDirection: 'row'}}>
          <FontAwesome name="calendar" size={32} color="#00ff00" />
          <Text style={styles.title}>{children}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10
  },
  title: {
    color: '#fff',
    textAlignVertical: 'center',
    paddingLeft: '5%'
  }
})
