import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const axios = require('axios');
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();

export default function boardList({ route, navigation }) {

  const { title, description, author, id } = route.params;
  const [userId, setUserId] = useState("");
  // const [datalist, setDatalist] = useState(data)

  useEffect(() => {
  AsyncStorage.getItem('nickname', (_err, result) => {
    setUserId(result);
  })
  },[])

  const edit = () => {
    if (userId === author) {
      navigation.navigate("boardEdit", {
        title: title,
        description: description,
        author: author,
        id: id
      })
    } else {
      alert("자신이 작성한 글만 수정이 가능합니다")
    }
  }

  const deleteBoard = async () => {
    if(userId===author){
    const response = await axios.post('http://172.16.129.50:3001/board/delete', {
      id: id
    }
    ).then(() => navigation.navigate("boardMain"))
  // const spec=()=>{
  //   console.log(userId)
  }
    // }
    else{
      alert("자신이 작성한 글만 삭제가 가능합니다")
    }
  }

  const spec=() => {
    navigation.navigate("boardMain")
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>제목:{title}</Text>
      <Text>작성자:{author}</Text>
      <Text>내용:{description}</Text>
      <Text>id:{id}</Text>
      <Pressable onPress={() => edit()}>
        <Text>글 수정하기</Text>
      </Pressable>
      <Pressable onPress={() => deleteBoard()}>
        <Text>글 삭제하기</Text>
      </Pressable>
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
  introbox: {
    width: win.width / 1.1,
    borderWidth: 2,
    height: win.height / 2,
    alignItems: "center",
    // justifyContent:"center",
    marginLeft: win.width / 20,
    marginTop: win.height / 60
  }
});