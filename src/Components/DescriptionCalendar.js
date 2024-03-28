import { StyleSheet, Text, View } from "react-native";
import MedidorPixel from "./MedidorPixel";

export default function DescriptionCalendar() {
	return(
		<View style={styles.descricaoContainer}>
			<View style={styles.descricaoSubContainer}>
				<Text style={[styles.descIcon, styles.descricaoIconPlantao]}/>
				<Text style={styles.descricaoText}>Plantões de trabalho</Text>
			</View>
			<View style={styles.descricaoSubContainer}>
				<Text style={[styles.descIcon,styles.descricaoIconFeriado]}/>
				<Text style={styles.descricaoText}>Feriados Nacionais</Text>
			</View>
      	</View>
	)
}

const styles = StyleSheet.create({
	descricaoContainer: {
		backgroundColor: '#00000025', 
		marginTop: MedidorPixel(15), //15 px
		flexDirection: 'column',
		paddingHorizontal: MedidorPixel(10),
		paddingVertical: MedidorPixel(10),
		justifyContent: 'space-around'
	},
	descricaoSubContainer: {
		flexDirection: 'row',
		padding: MedidorPixel(5)
	},
	descricaoText: {
		textAlignVertical: 'center', 
		color: '#fff', 
		paddingLeft: MedidorPixel(10),
	},
	descIcon: {
		aspectRatio: 1,
		width: '8%',
	},
	descricaoIconPlantao: {
		borderColor: '#00ff00',
		borderWidth: 2,
		borderRadius: 50,
	},
	descricaoIconFeriado: {
		backgroundColor: '#005499',
		borderRadius: 10,
	}
})

