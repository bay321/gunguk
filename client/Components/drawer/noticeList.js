import React,{useState} from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions,FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();

export default function noticeList( {route} ) {
    const { title,description } = route.params;
    // const [datalist, setDatalist] = useState(data)
    


  return (
    <View style={{ flex: 1 }}>
      <Text>제목:{title}</Text>
      <Text>내용:{description}</Text>
      
    </View>
  );
}


const styles = StyleSheet.create({
  menu: {
    marginTop: 60,
    borderWidth: 2,
    width: win.width / 10,
    height: win.width / 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: win.width / 1.15
  },
  introbox:{
    width:win.width/1.1,
    borderWidth:2,
    height:win.height/2,
    alignItems:"center",
    // justifyContent:"center",
    marginLeft:win.width/20,
    marginTop:win.height/60
  }
});