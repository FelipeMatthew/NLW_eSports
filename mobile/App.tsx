import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';


import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black 
} from '@expo-google-fonts/inter'

import { Subscription } from 'expo-modules-core'; // Vai observar quando chegar a notificação

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { Background } from "./src/components/Background";

import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { Notification } from 'phosphor-react-native';


export default function App() {

  const [ fontsLoaded ] =  useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black 
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener( notification => {
      console.log(notification)
    }) // Vai avisar quando chegar a notificação, fica escutando

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener( response => {
      console.log(response);
    } ) // age quando responde a essa notificação

    
    //return no useEffect irá retornar uma limpeza de dados
    return () => {
      if(getNotificationListener.current && responseNotificationListener.current){
        Notifications.removeNotificationSubscription( getNotificationListener.current);
        Notifications.removeNotificationSubscription( responseNotificationListener.current);
      }
    }
  })

  return (
    <Background>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? < Routes /> : < Loading />} 


    </Background>
  );
}





