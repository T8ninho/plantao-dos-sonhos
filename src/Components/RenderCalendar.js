import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import DayCard from "./DayCard";
import moment from "moment";
import { FontAwesome } from '@expo/vector-icons';
import MedidorPixel from "./MedidorPixel";

export default function RenderCalendar ({currentMonth, Plantao, feriados, prevMonth, nextMonth}) {
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

    return (
		<View>
			<View style={styles.header}>
				<TouchableOpacity onPress={prevMonth}>
					<FontAwesome name="chevron-left" size={32} color="black" />
				</TouchableOpacity>
					<Text style={styles.headerText}>
						{
							currentMonth.format('MMMM')
							.charAt(0)
							.toUpperCase() +
							currentMonth
							.format('MMMM/YYYY')
							.slice(1)
						}
					</Text>
				<TouchableOpacity onPress={nextMonth}>
				<FontAwesome name="chevron-right" size={32} color="black" />
				</TouchableOpacity>
			</View>
			<View style={styles.weekDays}>
				{moment.weekdaysShort().map((weekday) => (
				<Text key={weekday} style={styles.weekDay}>
					{weekday.charAt(0).toUpperCase() + weekday.slice(1)}
				</Text>
				))}
			</View>
			<View style={styles.calendar}>
				{daysArray.map((day, index) => (
					<View key={index} style={styles.dayContainer}>
						{day !== null ? (
						<DayCard day={day} currentMonth={currentMonth} Plantao={Plantao} feriados={feriados} />
						) : (
						<></>
						)}
					</View>
				))}
			</View>
		</View>
	)
  };

const styles = StyleSheet.create({
	calendar: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	dayContainer: {
		width: '14.28%', // 7 dias por semana
		aspectRatio: 1,
	},
	header: {
		backgroundColor: '#00ff00',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: MedidorPixel(5),
		paddingHorizontal: MedidorPixel(10),
	  },
	  headerText: {
		fontWeight: '900',
		fontSize: MedidorPixel(22),
		color: '#000',
	  },
	  weekDays: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: MedidorPixel(10),
		marginBottom: MedidorPixel(10),
	  },
	  weekDay: {
		flex: 1,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: MedidorPixel(14),
		color: '#10e956',
	  },	
})