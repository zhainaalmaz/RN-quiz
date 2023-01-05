import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../src/screens/Home';
import Quiz from '../src/screens/Quiz';
import Result from '../src/screens/Result';
import {useSelector} from 'react-redux';
import {Login} from '../src/screens/Login';
import {Signup} from '../src/screens/Signup';

const Stack = createStackNavigator();

export function MyStack() {
  const {isAuth} = useSelector(state => state.user);
  console.log(isAuth, 'auth');

  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }
  if (isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}
