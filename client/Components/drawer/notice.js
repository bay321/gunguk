import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import noticeList from './noticeList'
import noticeMain from './noticeMain'

const Stack = createStackNavigator();
export default function notice(){
    // Stack Navigator for Login and Sign up Screen
    return (
      <Stack.Navigator initialRouteName="noticeMain">
        <Stack.Screen
          name="noticeMain"
          component={noticeMain}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="noticeList"
          component={noticeList}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  