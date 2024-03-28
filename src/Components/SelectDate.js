import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import MedidorPixel from './MedidorPixel';

export default function SelectDate ({ onDateChange, selectedDate, children }) {
  const [date, setDate] = useState(selectedDate ? selectedDate.toDate() : new Date() || new Date());

  // initialDate ? initialDate.toDate() : new Date()

  const onChange = (event, item) => {
    const currentDate = item;
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
          <FontAwesome name="calendar" size={MedidorPixel(32)} color="#00ff00" />
          <View>
            <Text style={styles.title}>{children}</Text>
            {selectedDate && (
              <View style={styles.dateTextItem}>
                <Text style={styles.selectDateText}>{selectedDate.format('DD/MM/YYYY')}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    textAlignVertical: 'center',
    paddingLeft: MedidorPixel(10),
  },
  dateTextItem: {
    justifyContent: 'center'
  },
  selectDateText: {
    color: '#1d861d',
    textAlign: 'center',
    paddingLeft: MedidorPixel(10)
  },
})
