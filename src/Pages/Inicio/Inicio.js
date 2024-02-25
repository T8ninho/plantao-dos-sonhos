import { Text, View } from 'react-native';
import Calendario from '../Calendario/Calendario';

export default function Inicio() {
 	return (
   		<View>
			<Text>Inicio</Text>
			<Text>Plantão dos sonhos App</Text>
      		<Text>Aplicativo para gerenciarss dias trabalhados em regime plantonista.</Text>
			<Calendario />
   		</View>
  );
}