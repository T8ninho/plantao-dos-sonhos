import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

import Calendario from '../Conteudo/Calendario/Calendario';
import Sobre from '../Conteudo/Sobre/Sobre';

const Drawer = createDrawerNavigator();

export default function Conteudo() {

	const VidroEmbaçado = () => (
		<View style={styles.vidroEmbacado}>
		  {/* Seu conteúdo embaçado aqui */}
		</View>
	  );
	  
 return (
		<Drawer.Navigator 
			initialRouteName='Calendario'
			screenOptions={{
				headerTintColor: '#fff',
				headerStyle: {
					backgroundColor: '#0b0f32',
				},
				drawerActiveBackgroundColor: '#00ff00',
				drawerActiveTintColor: '#000',
				drawerInactiveTintColor: '#fff',
				drawerType: 'back',
				drawerLabelStyle: {
					marginLeft: -20
				},
				drawerStyle: {
					backgroundColor: '#0b0f32',				
				},
				swipeEdgeWidth:1000
			}}
	  
		>
			<Drawer.Screen 
				name='Calendario' 
				component={Calendario}  
				options={{
					title: 'Calendário',
					drawerIcon: ({focused, color}) => (
						<FontAwesome name="calendar" size={32} color={color}/>
					)
				}}
			/>
			<Drawer.Screen 
				name='Sobre' 
				component={Sobre}
				options={{
					title: 'Sobre',
					drawerIcon: ({focused, color}) => (
						<FontAwesome name="info-circle" size={32} color={color}/>
					)
				}}
			/>
		</Drawer.Navigator>
  );
}