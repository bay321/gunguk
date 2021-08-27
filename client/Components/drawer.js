import React from 'react';
import { StyleSheet, Text, View,Pressable,Button } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { AsyncStorage } from 'react-native';
import homeScreen from './drawer/homeScreen.js'
import note from './drawer/note'
import notice from './drawer/notice'
import intro from './drawer/intro'
import board from './drawer/board'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();




export default function drawer({ navigation }) {

  const logout = async () => {
    try {
      const value = await AsyncStorage.getItem('nickname');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      return null;
    }
  };



    return (
      <Drawer.Navigator drawerPosition="right" initialRouteName="Home"
      drawerStyle={{width:200}}>
        <Drawer.Screen name="Home" component={homeScreen} />
        <Drawer.Screen options={{title: '소개'}} name="intro" component={intro} />
        <Drawer.Screen options={{title: '동문수첩'}} name="note" component={note} />
        {/* <Drawer.Screen options={{title: '게시판'}} name="board" component={board} /> */}
        <Drawer.Screen options={{title: '게시판'}} name="board" component={board} />
        <Drawer.Screen options={{title: '공지사항'}} name="notice" component={notice} />

      </Drawer.Navigator>
    );
  }