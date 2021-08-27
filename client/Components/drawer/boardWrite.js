import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const win = Dimensions.get('window');
const axios = require('axios');
const Drawer = createDrawerNavigator();

export default function boardWrite({ navigation }) {
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  // useEffect(() => {
  //   AsyncStorage.getItem('nickname', (_err, result) => {
  //     setUserId(result);
  //   });
  // },[])
  useEffect(() => {
    AsyncStorage.getItem('nickname', (_err, result) => {
      setUserId(result);
    })
  },[])
  // const spec=()=>{
  //   console.log(userId)
  // }
  const write = async () => {
    // AsyncStorage.getItem('nickname', (_err, result) => {
    //   setUserId(result);
    // })
    const response = await axios.post('http://172.16.129.50:3001/board/write', {
      userId: userId,
      title: title,
      description: description
    }
    ).then(()=>navigation.navigate("boardMain"))
    // alert("글 작성 성공!")
    

  }


  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={styles.menu}
        onPress={() => navigation.openDrawer()}><Text>메뉴</Text>
      </Pressable>
      <View style={{ flexDirection: "row", marginTop: win.height / 140 }}>

        <View style={{ width: win.width / 4, height: win.height / 20, marginLeft: win.width / 20, flexDirection: "row", justifyContent: "center" }}>
          <View style={{ width: "100%", borderWidth: 2, height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Text>글쓰기</Text>
          </View>
        </View>

      </View>
      <View style={styles.introbox}>
        <Pressable
          // onPress={() => spec()}
          >
          <Text>글 작성</Text>
        </Pressable>
        <TextInput placeholder="제목 입력" value={title} onChangeText={text => { setTitle(text) }}></TextInput>
        <TextInput placeholder="내용 입력" value={description} onChangeText={text => { setDescription(text) }}></TextInput>
      </View>
      <Pressable style={{ backgroundColor: "white" }} onPress={() =>  write() }>
        <Text style={{ textAlign: "center", color: "black" }}>글 작성하기</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  menu: {
    marginTop: 10,
    borderWidth: 2,
    width: win.width / 10,
    height: win.width / 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: win.width / 1.15
  },
  introbox: {
    width: win.width / 1.1,
    borderWidth: 2,
    height: win.height / 2,
    marginLeft: win.width / 20,
    marginTop: win.height / 60
  }
});