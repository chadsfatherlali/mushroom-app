import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'

import { Provider as PaperProvider } from 'react-native-paper'

import AppbarCustom from './components/common/Appbar'
import Home from './components/pages/Home'
import Import from './components/pages/Import'
import Admin from './components/pages/Admin'
import AccountDetails from './components/pages/AccountDetails'

const Stack = createStackNavigator()

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <AppbarCustom {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Import" component={Import} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="AccountDetails" component={AccountDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
