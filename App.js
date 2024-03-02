import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import { useEffect, useState } from 'react';
import Routes from './src/Pages/Routes/Routes';

export default function App() {

  // Código para receber o tamanho da status bar.
  const [ statusBarHeight, setStatusBarHeight ] = useState(0);
  useEffect(() => {
    const getHeight = () => {
      const height =  getStatusBarHeight();
      setStatusBarHeight(height);
    };
    getHeight();
  }, [])
  //---------------------------------------------

  return (
    
    <Routes />
    // <SafeAreaView style={[styles.container]}>
    //   <StatusBar style="light" backgroundColor='#0b0f32'/>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071e42'
    // backgroundColor: '#0b0f32'
  },
});
