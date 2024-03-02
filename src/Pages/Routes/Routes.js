import Login from './Login.routes';
import Conteudo from './Conteudo.routes';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

export default function Routes() {
 return (
	<Conteudo />
  );
}