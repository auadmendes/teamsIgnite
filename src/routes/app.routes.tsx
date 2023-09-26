import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator()

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

export function AppRoutes() {
  return (
    <Navigator initialRouteName='Groups'>
      <Screen
        name='groups'
        component={Groups}
        options={{ headerShown: false }}
      />
      <Screen
        name='new'
        component={NewGroup}
        options={{ headerShown: false }}
      />
      <Screen
        name='players'
        component={Players}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}
