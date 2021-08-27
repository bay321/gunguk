import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const axios = require('axios');
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();

export default function boardEdit({ route, navigation }) {

  const { title, description, id } = route.params;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  // const [datalist, setDatalist] = useState(data)


  // AsyncStorage.getItem('nickname', (_err, result) => {
  //   setUserId(result);
  // })

  const edit = async () => {
    const response = await axios.put('http://172.16.129.50:3001/board/edit', {
      id: id,
      title: newTitle,
      description: newDescription
    }
    ).then(() => navigation.navigate("boardMain"))
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>제목:{title}</Text>
      <Text>작성자:{author}</Text>
      <Text>내용:{description}</Text> */}
      <Pressable onPress={() => edit()}>
        <Text>수정하는 자리입니다.</Text>
      </Pressable>
      <TextInput value={newTitle} onChangeText={text => { setNewTitle(text) }} style={styles.id} ></TextInput>
      <TextInput placeholder="비밀번호 입력" value={newDescription} onChangeText={text => { setNewDescription(text) }} style={styles.password} ></TextInput>

      <Pressable style={styles.login} onPress={() => edit()}>
        <Text>수정할래요</Text>
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