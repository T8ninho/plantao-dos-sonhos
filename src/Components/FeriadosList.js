import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';

const FeriadosList = ({ feriados, currentMonth }) => {
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
    marginTop: 30, 
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff'
  },
  feriadoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#10e956',
    borderRadius: 5,
  },
  feriadoDate: {
    fontSize: 16,
  },
  feriadoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeriadosList;
