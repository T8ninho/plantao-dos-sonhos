import Login from './Login.routes';
import Conteudo from './Conteudo.routes';

import { NavigationContainer } from '@react-navigation/native';


export default function Routes() {
 return (
	<NavigationContainer>
		<Conteudo />
	</NavigationContainer>
  );
}