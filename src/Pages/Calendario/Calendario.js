import 'moment/locale/pt-br';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import DayCard from '../../Components/DayCard';
import SelectDate from '../../Components/SelectDate';

moment.locale('pt-br');

const Calendario = () => {


  const [currentMonth, setCurrentMonth] = useState(moment());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const weekdaysShort = moment.weekdaysShort();

  const showStartDatePickerHandler = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerHandler = () => {
    setShowEndDatePicker(true);
  };

  const hideStartDatePickerHandler = () => {
    setShowStartDatePicker(false);
  };

  const hideEndDatePickerHandler = () => {
    setShowEndDatePicker(false);
  };

  const onStartDateChange = (selectedDate) => {
    setStartDate(moment(selectedDate));
    hideStartDatePickerHandler();
  };

  const onEndDateChange = (selectedDate) => {
    setEndDate(moment(selectedDate));
    hideEndDatePickerHandler();
  };


  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const Plantao = (day) => {
    return(
      day.isSameOrAfter(startDate) && 
      day.isSameOrBefore(endDate) && 
      day.diff(startDate, 'days') % 2 === 0
    )
  };
  

  const renderCalendar = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf('month').day();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = currentMonth.clone().date(i);
      daysArray.push(day);
    }

    return daysArray.map((day, index) => (
      <View key={index} style={styles.dayContainer}>
        {day !== null ? (
          // <Text style={styles.dayText}>{day}</Text>
          <DayCard day={day} currentMonth={currentMonth} Plantao={Plantao}/>
        ) : (
          <Text style={styles.dayText}></Text>
        )}
      </View>
      
    ));
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={[styles.headerText, styles.headerIcon]}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentMonth.format('MMMM').charAt(0).toUpperCase() + currentMonth.format('MMMM/YYYY').slice(1)}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={[styles.headerText, styles.headerIcon]}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
		  {weekdaysShort.map((weekday) => (
			  <Text key={weekday} style={styles.weekDay}>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}</Text>
		  ))}
		  </View>
      <View style={styles.calendar}>{renderCalendar()}</View>

      <View style={{backgroundColor: '#00000025', marginTop: 30, padding: 15, flexDirection: 'row'}}>
        <Text style={{
          textAlign: 'center',
          textAlignVertical: 'center',
          aspectRatio: 1,
          width: '12%',
          color: 'green',
          borderColor: '#10e956',
          borderWidth: 1,
          borderRadius: 50,
        }}
      />
        <Text style={{textAlignVertical: 'center', color: '#fff', paddingLeft: '5%'}}>Plantões de trabalho</Text>
      </View>

      <View style={{backgroundColor: '#00000025', marginTop: 50, padding: 15}}>
        <View style={{marginBottom: 15, backgroundColor: '#00000025', padding: 10}}>
          <TouchableOpacity onPress={showStartDatePickerHandler}>
            <Text style={{color: '#fff'}}>Selecionar Data Inicial que você Folga</Text>
          </TouchableOpacity>
          <SelectDate 
            isVisible={showStartDatePicker}
            mode="date"
            initialDate={startDate ? startDate.toDate() : new Date()}
            onDateChange={onStartDateChange}
            onCancel={hideStartDatePickerHandler}
          />
        </View>
        <View style={{marginBottom: 15, backgroundColor: '#00000025', padding: 10}}>
          <TouchableOpacity onPress={showEndDatePickerHandler}>
            <Text style={{color: '#fff'}}>Selecionar Data Final</Text>
          </TouchableOpacity>
          <SelectDate
            isVisible={showEndDatePicker}
            mode="date"
            initialDate={endDate ? endDate.toDate() : new Date()}
            onDateChange={onEndDateChange}
            onCancel={hideEndDatePickerHandler}
          />
        </View>
        {startDate && endDate && (
          <View style={styles.selectedDates}>
            <Text style={{color: '#fff'}}>Data Inicial: {startDate.format('DD/MM/YYYY')}</Text>
            <Text style={{color: '#fff'}}>Data Final: {endDate.format('DD/MM/YYYY')}</Text>
          </View>
        )}
      </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
	  backgroundColor: '#10e956',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  headerText: {
    textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 22,
		color: '#ffff',
    padding: 10,
  },
  headerIcon: {
		fontSize: 25,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%', // 7 dias por semana
    aspectRatio: 1,
  },
  dayText: {
    fontSize: 16,
  },
  weekDays: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
	  },
	weekDay: {
		flex: 1,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 14,
		margin: 1,
		color: '#089937',
	  },
    selectedDates: {
      padding: 10,
      backgroundColor: '#00000025'
    }
});

export default Calendario;
