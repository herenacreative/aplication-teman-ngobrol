import 'react-native-gesture-handler';
navigator.geolocation = require('@react-native-community/geolocation');
import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {IconButton, Colors} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/screens/Home';
import Maps from './src/screens/Maps';
import Realtime from './src/screens/Realtime';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import RegisterNew from './src/screens/RegisterNew';
import Contact from './src/screens/Contact';
import Detail from './src/screens/Detail';
import Chat from './src/screens/Chat';
// import Profil from './src/screens/Profil';


import {Provider} from 'react-redux';
import storage from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const {store, persistor} = storage;

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#432818',
    accent: '#6F1D1B',
    // backgroundColor: 'black',
  },
};

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Home"
      component={TopNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Maps" component={Maps} />
    <Stack.Screen name="Realtime" component={Realtime} />
    <Stack.Screen name="Contact" component={Contact} />
    <Stack.Screen name="Detail" component={TabNavigator} />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
    <Stack.Screen name="RegisterNew" component={RegisterNew} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

const TopNavigator = () => (
  <TabTop.Navigator>
    <TabTop.Screen name="Home" component={Home} />
    <TabTop.Screen name="Maps" component={Maps} />
    <TabTop.Screen name="Profil" component={Detail} />
  </TabTop.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Detail"
    activeColor="#f0edf6"
    inactiveColor="#BB9457"
    barStyle={{backgroundColor: '#432818'}}>
    <Tab.Screen
      name="Detail"
      component={Detail}
      options={{
        tabBarLabel: 'Detail',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="information-circle"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Edit"
      component={RegisterNew}
      options={{
        tabBarLabel: 'Edit',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account-edit" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="message" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <HomeNavigator/>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
    </> 
  );
}

export default App;