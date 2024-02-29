import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function SelectDate ({ isVisible, mode, onDateChange, onCancel, initialDate }) {
  const [date, setDate] = useState(initialDate || new Date());

  const onDateChangeHandler = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate);
    }
  };

  return (
    <View>
      {isVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onDateChangeHandler}
        />
      )}
      <TouchableOpacity onPress={onCancel}>
        <Text style={{color: '#ffffff51'}}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

