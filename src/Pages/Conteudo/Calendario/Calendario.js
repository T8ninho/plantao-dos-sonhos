import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import DayCard from '../../../Components/DayCard';
import SelectDate from '../../../Components/SelectDate';
import FeriadosList from '../../../Components/FeriadosList';
import MedidorPixel from '../../../Components/MedidorPixel';

moment.locale('pt-br');


const Calendario = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [feriados, setFeriados] = useState([]); // Adicione o estado para armazenar os feriados

  const weekdaysShort = moment.weekdaysShort();

  const onStartDateChange = (selectedDate) => {
    setStartDate(moment(selectedDate));
  };

  const onEndDateChange = (selectedDate) => {
    setEndDate(moment(selectedDate));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const Plantao = (day) => {
    return (
      day.isSameOrAfter(startDate) &&
      day.isSameOrBefore(endDate) &&
      day.diff(startDate, 'days') % 2 === 0
    );
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const savedStartDate = await AsyncStorage.getItem('startDate');
        const savedEndDate = await AsyncStorage.getItem('endDate');

        if (savedStartDate !== null) {
          setStartDate(moment(savedStartDate));
        }

        if (savedEndDate !== null) {
          setEndDate(moment(savedEndDate));
        }

        // Obtenha feriados da API para o ano atual
        const currentYear = moment().year();
        const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`);
        setFeriados(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []); // Executa apenas uma vez no início

  useEffect(() => {
    const salvarDados = async () => {
      try {
        if (startDate !== null) {
          await AsyncStorage.setItem('startDate', startDate.format('YYYY-MM-DD'));
          console.log('Dados1 salvos com sucesso!');
        }

        if (endDate !== null) {
          await AsyncStorage.setItem('endDate', endDate.format('YYYY-MM-DD'));
          console.log('Dados2 salvos com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };

    salvarDados();
  }, [startDate, endDate]); // Executa sempre que startDate ou endDate mudarem

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
          <DayCard day={day} currentMonth={currentMonth} Plantao={Plantao} feriados={feriados} />
        ) : (
          <Text></Text>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <FontAwesome name="chevron-left" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentMonth.format('MMMM').charAt(0).toUpperCase() +
            currentMonth.format('MMMM/YYYY').slice(1)}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <FontAwesome name="chevron-right" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {weekdaysShort.map((weekday) => (
          <Text key={weekday} style={styles.weekDay}>
            {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
          </Text>
        ))}
      </View>
      <View style={styles.calendar}>{renderCalendar()}</View>

      <View style={styles.descricaoContainer}>
        <Text style={styles.descricaoIconPlantao}/>
        <Text style={styles.descricaoText}>Plantões de trabalho</Text>
      </View>
      <View style={styles.descricaoContainer}>
        <Text style={styles.descricaoIconFeriado}/>
        <Text style={styles.descricaoText}>Feriados Nacionais</Text>
      </View>

      <FeriadosList feriados={feriados} currentMonth={currentMonth} />

      <View style={styles.selectedDatesContainer}>
          <View style={styles.selectDateItem}>
            <SelectDate initialDate={startDate ? startDate.toDate() : new Date()} onDateChange={onStartDateChange}>
              Data Inicial
            </SelectDate>
            {startDate && (
            <View style={styles.dateTextItem}>
              <Text style={styles.selectDateText}>{startDate.format('DD/MM/YYYY')}</Text>
            </View>
            )}
          </View>
          <View style={styles.selectDateItem}>
            <SelectDate initialDate={endDate ? endDate.toDate() : new Date()} onDateChange={onEndDateChange} >
              Data Final
            </SelectDate>
            {endDate && (
              <View style={styles.dateTextItem}>
                <Text style={styles.selectDateText}>{endDate.format('DD/MM/YYYY')}</Text>
              </View>
            )}
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MedidorPixel(10), //20 px
    backgroundColor: '#071e42'
  },
  header: {
    backgroundColor: '#00ff00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MedidorPixel(10), //10 px
    paddingHorizontal: MedidorPixel(10), //10 px
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: MedidorPixel(22), //22px
    color: '#000',
    padding: MedidorPixel(10), //10 px
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%', // 7 dias por semana
    aspectRatio: 1,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MedidorPixel(5), //5 px
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: MedidorPixel(14), //14px
    margin: 1,
    color: '#10e956',
  },
  selectedDatesContainer: {
    paddingTop: MedidorPixel(15), //15 px
    paddingHorizontal: MedidorPixel(15), //15 px
    paddingBottom: MedidorPixel(5), //5 px
    marginTop: MedidorPixel(10), //10 px
    backgroundColor: '#00000025',
  },
  selectDateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: MedidorPixel(10), //10 px
  },
  dateTextItem: {
    width: '48%',
    paddingBottom: MedidorPixel(10), //10 px
    justifyContent: 'center'
  },
  selectDateText: {
    color: '#fff'
  },
  descricaoContainer: {
    backgroundColor: '#00000025', 
    marginTop: MedidorPixel(15), //15 px
    padding: MedidorPixel(15), //15 px
    flexDirection: 'row'
  },
  descricaoText: {
    textAlignVertical: 'center', 
    color: '#fff', 
    paddingLeft: MedidorPixel(10),
  },
  descricaoIconPlantao: {
    aspectRatio: 1,
    width: '8%',
    borderColor: '#00ff00',
    borderWidth: 2,
    borderRadius: 50,
  },
  descricaoIconFeriado: {
    backgroundColor: '#005499',
    aspectRatio: 1,
    width: '8%',
    borderRadius: 10,
  }
});

export default Calendario;
