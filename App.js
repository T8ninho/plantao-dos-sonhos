import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Inicio from './src/Pages/Inicio/Inicio';

export default function App() {
  return (
    <View style={styles.container}>
      <Inicio />
      <StatusBar style="light" animated={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f32',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
