import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Game } from '../screens/Game';

const { Navigator, Screen } = createNativeStackNavigator(); 

export function AppRoutes() {
    return (
        <Navigator 
            screenOptions={{ headerShown: false }}
        >
            {/* Nome da rota */}
            <Screen 
                name='home'
                component={Home}

            />

            {/* Nome do componente */}
            <Screen 
                name='game'
                component={Game}
            />
        </Navigator>
    )
}