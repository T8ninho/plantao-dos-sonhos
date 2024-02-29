import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import moment from 'moment';

export default function DayCard({ day, Plantao }) {
	const Hoje = day.isSame(moment(), 'day');

	return (
		<TouchableOpacity
			style={[ styles.dayContainer, Hoje && styles.hoje ]}
			onPress={() => console.log(day)}
		>
			<Text style={[styles.day, Hoje && styles.hojeText, Plantao(day) && styles.PlantaoText]}>
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
		fontSize: 16,
		margin: 1,
		color: '#ffffff',
		margin: 5,
	  },
	  hoje: {
		backgroundColor: '#10e956'
	  },
	  hojeText: {
		fontWeight: 'bold',
		color: '#000',
		fontSize: 20
	  },
	  PlantaoText: {
		color: 'green',
		borderColor: '#10e956',
		borderWidth: 1,
		borderRadius: 50
	  }
})