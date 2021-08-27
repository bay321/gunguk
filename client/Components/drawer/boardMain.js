import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const win = Dimensions.get('window');
const axios = require('axios');
const Drawer = createDrawerNavigator();

export default function boardMain({ navigation }) {
  const [datalist, setDatalist] = useState("")

  useEffect(() => {
    const response = axios.get('http://172.16.129.50:3001/board')
      .then((response) => { setDatalist(response.data) })
  },[datalist])

  // }, []);
  // useEffect(() => {
    // console.log("뭐가 문제일까")
  // })

  // async function spec() {
  //       const response = await axios.get('http://192.168.0.9:3001/api/get')
  //       .then((response)=>{setDatalist(response.data);})
  //   }

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        key={index}
        // onPress={() => Linking.openURL("" + item.link + "")}
        onPress={() => navigation.navigate("boardList", {
          title: item.title,
          description: item.description, author: item.author,
          id:item.id
        })}
        style={{ marginTop: 10, borderWidth: 2 }}
      >
        <View>
          <Text>제목:{item.title}</Text>
          <Text>닉네임:{item.author}</Text>
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
      <View style={{ flexDirection: "row", marginTop: win.height / 40 }}>

        <View style={{ width: win.width / 4, height: win.height / 20, marginLeft: win.width / 20, flexDirection: "row", justifyContent: "center" }}>
          <View style={{ width: "100%", borderWidth: 2, height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Text>게시판</Text>
          </View>
        </View>
        <Pressable
          style={{alignItems:"center",justifyContent:"center",borderWidth:2,marginLeft:win.width/1.8}}
          onPress={() => navigation.navigate("boardWrite")}><Text>글쓰기</Text>
        </Pressable>

      </View>
      <View style={styles.introbox}>
        <Pressable>
          <Text>게시글</Text>
        </Pressable>
        <FlatList
          data={datalist}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          horizontal={false}
          numColumns={1}
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
    marginLeft: win.width / 20,
    marginTop: win.height / 60
  }
});