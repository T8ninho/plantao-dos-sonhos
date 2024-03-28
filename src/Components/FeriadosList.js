import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';
import MedidorPixel from './MedidorPixel';

export default function FeriadosList({ feriados, currentMonth }) {
  // Filtrar feriados para incluir apenas aqueles do mês atual
  const feriadosDoMes = feriados.filter(
    (feriado) =>
      moment(feriado.date).month() === currentMonth.month() &&
      moment(feriado.date).year() === currentMonth.year()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feriados</Text>
      <FlatList
        data={feriadosDoMes}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.feriadoContainer}>
            <Text style={styles.feriadoName}>{item.name}</Text>
            <Text style={styles.feriadoDate}>{moment(item.date).format('DD/MM/YYYY')}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000025', 
    padding: MedidorPixel(15)
  },
  title: {
    fontSize: MedidorPixel(20),
    fontWeight: 'bold',
    marginBottom: MedidorPixel(10),
    color: '#fff'
  },
  feriadoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MedidorPixel(5),
    padding: MedidorPixel(10),
    backgroundColor: '#005499',
    borderRadius: 5,
  },
  feriadoDate: {
    fontSize: MedidorPixel(16),
    color: '#fff'
  },
  feriadoName: {
    fontSize: MedidorPixel(16),
    fontWeight: 'bold',
    color: '#fff'
  },
});
