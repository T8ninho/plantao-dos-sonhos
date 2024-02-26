import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function Calendario() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [calendar, setCalendar] = useState([]);

  const navigateToPreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const navigateToNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  useEffect(() => {
    const generateCalendar = () => {
      const calendarData = [];

      for (let month = 0; month < 12; month++) {
        const startDay = moment().locale("pt").month(month).year(currentYear).startOf("month").startOf("week");
        const endDay = moment().locale("pt").month(month).year(currentYear).endOf("month").endOf("week");

        const monthData = {
          name: moment().locale("pt").month(month).format("MMMM"),
          days: [],
        };

        let day = startDay.clone().subtract(1, "day");

        while (day.isBefore(endDay, "day")) {
          monthData.days.push(day.add(1, "day").clone());
        }

        calendarData.push(monthData);
      }

      setCalendar(calendarData);
    };

    generateCalendar();
  }, [currentYear]);

  return (
    <View style={styles.calendarPage}>
      <View style={styles.headerPageContainer}>
        <TouchableOpacity onPress={navigateToPreviousYear}>
          <Text style={styles.headerPage}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerPage}>{currentYear}</Text>
        <TouchableOpacity onPress={navigateToNextYear}>
          <Text style={styles.headerPage}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={calendar}
        renderItem={({ item }) => (
          <MonthCard month={item.name} days={item.days} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

function MonthCard({ month, days }) {
  return (
    <View style={styles.monthCard}>
      <Text style={styles.header}>{month}</Text>
      <View style={styles.weekDays}>
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((weekday) => (
          <Text key={weekday} style={styles.weekDay}>{weekday}</Text>
        ))}
      </View>
      <FlatList
        data={days}
        renderItem={({ item }) => <DayCard day={item} />}
        keyExtractor={(item) => item._d.getTime().toString()}
        numColumns={7}
      />
    </View>
  );
}

function DayCard({ day }) {
  return (
    <Text style={styles.day}>{day.format("DD")}</Text>
  );
}

const styles = StyleSheet.create({
  calendarPage: {
    flex: 1,
    padding: 20
  },
  headerPageContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#10e956'
  },
  headerPage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff'
  },
  monthCard: {
    marginVertical: 10,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#10e956',
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
  day: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    margin: 1,
    color: '#ffffff'
  },
  dayP: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    margin: 1,
    color: '#00000039',
  },
});