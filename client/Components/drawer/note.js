import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions,FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/core';
import noteUser from './noteUser'
import noteEnrolled from './noteEnrolled'
import noteGraduated from './noteGraduated'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
const axios = require('axios');
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function note(){
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator>
      <Tab.Screen
        name="noteEnrolled"
        component={noteEnrolled}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="noteGraduated"
        component={noteGraduated}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="noteUser"
        component={noteUser}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
