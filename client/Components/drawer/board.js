import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import boardList from './boardList'
import boardWrite from './boardWrite'
import boardMain from './boardMain'
import boardEdit from './boardEdit'

const Stack = createStackNavigator();
export default function board(){
    // Stack Navigator for Login and Sign up Screen
    return (
      <Stack.Navigator initialRouteName="boardMain">
        <Stack.Screen
          name="boardMain"
          component={boardMain}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="boardList"
          component={boardList}
          options={{
            title: '동문 게시판', //Set Header Title
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="boardWrite"
          component={boardWrite}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="boardEdit"
          component={boardEdit}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  