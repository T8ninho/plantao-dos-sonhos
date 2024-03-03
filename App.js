import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import Routes from './src/Pages/Routes/Routes';

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor='#0b0f32'/>
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071e42'
    // backgroundColor: '#0b0f32'
  },
});
