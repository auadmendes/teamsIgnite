import { ThemeProvider } from 'styled-components';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

import { Loading } from '@components/Loading';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import theme from './src/theme'
import { Routes } from '@routes/index';



export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >

        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}

      </KeyboardAvoidingView>
    </ThemeProvider>
  );
}

