import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions,FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/core';
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();
const axios = require('axios');

export default function intro({ navigation }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("cops");
  // useEffect(() => {
  //   console.log(content)
  // })
  // useEffect(() => {
  //   const response = axios.get('http://192.168.0.11:3001/board')
  //     .then((response) => { setContent(response.data) })
  // },[status])

  useEffect(() => {
    if (status == "cops") {
          const response = axios.get('http://172.16.128.40:3001/noticeData')
      .then((response) => { setContent(response.data) })
      // setContent("경찰학과는 멋있는 학과입니다")


      
    } else {
      const response = axios.get('http://172.16.129.50:3001/users/professor')
    .then((response) => { setContent(response.data) })
    }
  }, [status])
  // const desc = () => {
  //   if (status == "cops") {
  //     setContent("경찰학과는 멋있는 학과입니다")
  //   } else {
  //     setContent("교수님 내용 소개")
  //   }
  // }
  const renderItem = ({ item,index }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("noteUser", {
          name: item.name,
          years: item.years,
          userStatus: item.userStatus
        })}
        style={{ marginTop: 10, borderWidth: 2, paddingVertical: win.height / 50, width: "40%", marginLeft: "10%" }}
      >
        <View>
          <Text>이름:{item.id}</Text>
          <Text>직업:{item.userStatus}</Text>
          <Text>기수:{item.years}</Text>
        </View>

      </Pressable>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={styles.menu}
        onPress={() => navigation.openDrawer()}><Text>메뉴</Text>
      </Pressable>
      <View style={{ width: win.width / 2, height: win.height / 20, marginLeft: win.width / 20, flexDirection: "row", marginTop: win.height / 40, justifyContent: "center" }}>
        <Pressable onPress={() => { setStatus("cops") }} style={status == "cops" ? styles.pushed : styles.unPushed}>
          <Text>경찰학과 소개</Text>
        </Pressable>
        <Pressable onPress={() => { setStatus("pro") }} style={status == "pro" ? styles.pushed : styles.unPushed}>
          <Text>교수님 소개</Text>
        </Pressable>
      </View>
      <View style={styles.introbox}>
        {/* <Text>{content}</Text> */}
        <FlatList
        key={'#'}
          data={content}
          keyExtractor={item => "#" + item.id}
          renderItem={renderItem}
          horizontal={false}
          numColumns={3}
        />
      </View>
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
  },
  pushed: {
    width: "48%",
    borderWidth: 2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "4%",
    backgroundColor: "green"
  },
  unPushed: {
    width: "48%",
    borderWidth: 2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "4%",
  },
  red: {
    backgroundColor: "red"
  },
  green: {
    color: "green"
  },
  red: {
    color: "red"
  }
});