import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from '../Conteudo/Inicio/Inicio';
import Calendario from '../Conteudo/Calendario/Calendario';

const Stack = createNativeStackNavigator()

export default function Conteudo() {
 return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName='Calendario'>
			<Stack.Screen name='Inicio' component={Inicio}/>
			<Stack.Screen name='Calendario' component={Calendario} />
		</Stack.Navigator>
	</NavigationContainer>
  );
}