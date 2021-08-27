import React from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();


export default function homeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={styles.menu}
        onPress={() => navigation.openDrawer()}><Text>메뉴</Text>
      </Pressable>
      <View style={{width:win.width/1.1,borderWidth:2,height:win.height/6,alignItems:"center",justifyContent:"center",marginLeft:win.width/20,marginTop:win.height/40}}>
        <Text>사진</Text>
      </View>
      <View style={{width:win.width/1.1,height:win.height/6,marginLeft:win.width/20,flexDirection:"row",marginTop:win.height/40,justifyContent:"center"}}>
        <View style={{width:"48%",borderWidth:2,height:"100%",alignItems:"center",justifyContent:"center",marginRight:"4%"}}>
          <Text>소개</Text>
        </View>
        <View style={{width:"48%",borderWidth:2,height:"100%",alignItems:"center",justifyContent:"center"}}>
          <Text>동문수첩</Text>
        </View>
      </View>
      <View style={{width:win.width/1.1,height:win.height/6,marginLeft:win.width/20,flexDirection:"row",marginTop:win.height/40,justifyContent:"center"}}>
        <View style={{width:"48%",borderWidth:2,height:"100%",alignItems:"center",justifyContent:"center",marginRight:"4%"}}>
          <Text>게시판</Text>
        </View>
        <View style={{width:"48%",borderWidth:2,height:"100%",alignItems:"center",justifyContent:"center"}}>
          <Text>공지사항</Text>
        </View>
      </View>
      <Button title="로그아웃" onPress={() => 
      // AsyncStorage.setItem('nickname', "null", () => {
      //   console.log('로그아웃 완료')
      //   navigation.navigate("Auth")
      // })
      AsyncStorage.clear()
      .then(console.log('로그아웃 완료'))
      .then(navigation.navigate("Auth"))
      } />
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
  }
});