import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
    const { granted } = await Notifications.getPermissionsAsync(); // Ve se o dispositivo esta autorizado a receber notificação

    if(!granted) await Notifications.requestPermissionsAsync();

    if(granted){
        const pushToken = await Notifications.getExpoPushTokenAsync();
        return pushToken.data;
    }
}