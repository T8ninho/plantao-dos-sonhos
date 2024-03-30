import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import MedidorPixel from './MedidorPixel';
import { useState } from 'react';

export default function DayCard({ day, Plantao, feriados }) {
  const Hoje = day.isSame(moment(), 'day');
  const isFeriado = feriados.some((feriado) => day.isSame(moment(feriado.date), 'day'));

  return (
    <TouchableOpacity
      style={[
          styles.dayContainer,
          Hoje && styles.hoje, 
          isFeriado && styles.feriado,
        ]}
    >
      <Text
        style={[
          styles.day,
          isFeriado && styles.feriadoText,
          Plantao(day) && styles.PlantaoText,
          Hoje && styles.hojeText,
          (Hoje === Plantao(day) && Hoje === true) && styles.PlantaoTextHoje,
          (Hoje === isFeriado && Hoje === Plantao(day) && Hoje === true) && styles.FeriadoTextHoje
        ]}
      >
        {day.format('D')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderColor: '#ffffff21',
    borderWidth: 1,
    borderRadius: 10,
    margin: 2
  },
  day: {
    position: 'relative',
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: MedidorPixel(16),
    margin: MedidorPixel(5),
  },
  hoje: {
    backgroundColor: '#00ff00',
    margin: MedidorPixel(-2)
  },
  hojeText: {
    fontWeight: '900',
    color: '#000',
    fontSize: MedidorPixel(20),
  },
  PlantaoText: {
    borderColor: '#00ff00',
    borderWidth: 2,
    borderRadius: 50,
  },
  PlantaoTextHoje: {
    borderColor: '#000000',
    color: '#000',
    borderWidth: 2,
    borderRadius: 50,
  },
  FeriadoTextHoje: {
    borderColor: '#00ff00',
    color: '#000',
    borderWidth: 2,
    borderRadius: 50,
  },
  feriado: {
    backgroundColor: '#005499',
  },
  feriadoText: {
    fontWeight: 'bold',
  },
});
