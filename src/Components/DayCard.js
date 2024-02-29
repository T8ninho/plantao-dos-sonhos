import {TouchableOpacity, Text, StyleSheet} from 'react-native'

import moment from 'moment';
import { useState } from 'react';

export default function DayCard({ day, currentMonth, Plantao }) {
	// const isCurrentMonth = moment(day).format('MMMM') === month;
	// const Hoje = moment().isSame(day, 'day');
	const Hoje = day.isSame(moment(), 'day');
	// const Plantao = index % 2 === 1; // Destacar a cada dois dias

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
		justifyContent: 'center'
	  },
	  day: {
		textAlign: 'center',
		fontSize: 16,
		margin: 1,
		color: '#ffffff'
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
	  }
})