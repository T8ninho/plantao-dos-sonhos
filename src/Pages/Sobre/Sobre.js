import { Linking, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import MedidorPixel from '../../Components/MedidorPixel';


export default function Sobre() {
	const LinkPress = (url) => {
		Linking.openURL(url);
	  };

 	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Plantão dos Sonhos - 1.0.0</Text>
				<View style={styles.descricao}>
					<View style={styles.containerSub}>
						<Text style={styles.text}>Aplicativo desenvolvido para facilitar o dia de profissionais que trabalham em regime de plantão e exibindo feriados futuros para ajuda-los a se programarem.</Text>
					</View>
					<Text style={styles.textTitle}>Caso tenha alguma dúvida, sugestão ou reclamação fique livre para:</Text>
					<View style={styles.containerDuvida}>
						<Text style={styles.text}>- Enviar um email</Text>
						<Text style={styles.text}>- Avaliar o aplicativo com 5 estrelas</Text>
						<TouchableHighlight onPress={() => LinkPress('http://www.t8ninho.com/')}>
							<View style={{flexDirection: 'row'}}>
								<Text style={styles.text}>- </Text>
								<Text style={[styles.text, {textDecorationLine: 'underline'}]}>Acessar meu site</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			</View>
			<View style={styles.containerFooter}>
				<Text style={styles.textFooter}>Desenvolvido por T8ninho</Text>
				<TouchableHighlight onPress={() => LinkPress('http://www.t8ninho.com/')}>
					<Text style={styles.textLink}>www.T8ninho.com</Text>
				</TouchableHighlight>
			</View>
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: MedidorPixel(20),
		backgroundColor: '#071e42',
		justifyContent: 'space-between'
	},
	title: {
		textAlign: 'center',
		fontWeight: '900',
		color: '#fff',
		fontSize: MedidorPixel(20),
		paddingBottom: MedidorPixel(20),
		borderBottomWidth: 2,
		borderBottomColor: '#00ff00'
	},
	descricao: {
		paddingHorizontal: MedidorPixel(20)
	},
	containerSub: {
		paddingVertical: MedidorPixel(10)
	},
	textTitle: {
		color: '#fff',
		fontSize: MedidorPixel(15),
		fontWeight: '900'
	},
	text: {
		color: '#fff'
	},
	textFooter: {
		textAlign: 'center',
		color: '#fff'
	},
	textLink: {
		textDecorationLine: 'underline',
		textAlign: 'center',
		color: '#ffffff85'
	},
	containerDuvida: {
		paddingVertical: MedidorPixel(10),
		paddingHorizontal: MedidorPixel(20)
	},
	containerFooter: {
		paddingTop: MedidorPixel(20),
		borderTopWidth: 2,
		borderTopColor: '#00ff00'
	}
})