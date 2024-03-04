import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import MedidorPixel from './MedidorPixel';

export default function DayCard({ day, Plantao, feriados }) {
  const Hoje = day.isSame(moment(), 'day');
  const isFeriado = feriados.some((feriado) => day.isSame(moment(feriado.date), 'day'));

  return (
    <TouchableOpacity
      style={[styles.dayContainer, Hoje && styles.hoje, isFeriado && styles.feriado]}
      onPress={() => console.log(day)}
    >
      <Text
        style={[
          styles.day,
          isFeriado && styles.feriadoText,
          Plantao(day) && styles.PlantaoText,
          Hoje && styles.hojeText,
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
    margin: 1,
    justifyContent: 'center',
  },
  day: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: MedidorPixel(16),
    margin: 1,
    color: '#ffffff',
    margin: MedidorPixel(5),
  },
  hoje: {
    backgroundColor: '#00ff00',
  },
  hojeText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: MedidorPixel(20),
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 50,
  },
  PlantaoText: {
    borderColor: '#00ff00',
    borderWidth: 2,
    borderRadius: 50,
  },
  feriado: {
    backgroundColor: '#005499',
  },
  feriadoText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
