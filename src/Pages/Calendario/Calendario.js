import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectDate from '../../Components/SelectDate';
import FeriadosList from '../../Components/FeriadosList';
import MedidorPixel from '../../Components/MedidorPixel';
import RenderCalendar from '../../Components/RenderCalendar';
import DescriptionCalendar from '../../Components/DescriptionCalendar';
import Swiper from 'react-native-swiper';

moment.locale('pt-br');


export default function Calendario() {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [feriados, setFeriados] = useState([]); // Adicione o estado para armazenar os feriados

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
    // Clona as datas sem a parte do tempo (horas, minutos, segundos, milissegundos)
    const startDateWithoutTime = startDate ? startDate.clone().startOf('day') : null;
    const endDateWithoutTime = endDate ? endDate.clone().startOf('day') : null;
    const dayWithoutTime = day.clone().startOf('day');

  // Verifica se as datas (sem a parte do tempo) estão definidas
    return (
      startDateWithoutTime && 
      endDateWithoutTime && 
      // Compara as datas (sem a parte do tempo)
      dayWithoutTime.isSameOrAfter(startDateWithoutTime) &&
      dayWithoutTime.isSameOrBefore(endDateWithoutTime) &&
      // Verifica se a diferença em dias (sem a parte do tempo) é par
      dayWithoutTime.diff(startDateWithoutTime, 'days') % 2 === 0
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

  return (
    <Swiper loop={false} showsPagination={false}>
      <View style={styles.container}>
        <RenderCalendar 
          currentMonth={currentMonth} 
          Plantao={Plantao} 
          feriados={feriados} 
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />

        <DescriptionCalendar />

        <View style={styles.containerDates}>
          <Text style={styles.textTitle}>Definir escala plantonista:</Text>
          <View style={styles.selectedDatesContainer}>
            <View style={styles.selectedDatesSubContainer}>
              <SelectDate selectedDate={startDate} onDateChange={onStartDateChange}>
                Data Inicial:
              </SelectDate>
            </View>
            <View style={styles.selectedDatesSubContainer}>
              <SelectDate selectedDate={endDate} onDateChange={onEndDateChange} >
                Data Final:
              </SelectDate>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.container}>
        <FeriadosList
          feriados={feriados} 
          currentMonth={currentMonth} 
        />
      </View>
      
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MedidorPixel(10),
    backgroundColor: '#071e42',
  },
  containerDates: {
    paddingTop: MedidorPixel(10),
  },
  selectedDatesContainer: {
    marginTop: MedidorPixel(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: MedidorPixel(10),
  },
  selectedDatesSubContainer: {
    padding: MedidorPixel(10),
    flex: 1,
    backgroundColor: '#00000025',
  },
  textTitle: {
    color: '#10e956',
    fontWeight: 'bold',
    paddingLeft: MedidorPixel(15),
    fontSize: MedidorPixel(20),
  }
});

