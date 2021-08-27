import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Dimensions, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/core';
const axios = require('axios');
const win = Dimensions.get('window');
const Drawer = createDrawerNavigator();


export default function noteGraduated({ navigation }) {
  const [data, setData] = useState("");
  const [datalist, setDatalist] = useState("");
  // const [years, setYears] = useState(15);
  const [numberData, setNumberData] = useState("");
  // const [selectedData, setSelectedData] = useState("");
  const [selectedId, setSelectedId] = useState("");
  
  useEffect(() => {
  const responseNum = axios.get('http://172.16.129.50:3001/numberData')
  .then((responseNum) => { setNumberData(responseNum.data) })
  },[])
  // const spec = ()=>{
  //   console.log("뭔가 로그")
  // }
  // console.log(numberData)
  // useEffect(() => {
    useEffect(() => {
      // let mounted = true;
    const response = axios.get('http://172.16.129.50:3001/users/graduated')
    .then((response) => { setData(response.data) })
    // .then(()=>setDatalist([...data.filter(e => e.years == 13)]))
    // return () => (mounted = false);
  }, []);

    const filter = status => {
      setDatalist([...data.filter(e => e.years == status)])
      setSelectedId(status)
    }
    // .then((response) => { setDatalist(response.data) })
  // }, [selectedId])
  // useEffect(()=>{
  //   console.log(content)
  // },[content])
// const filter = status => {
//   setDatalist([...data.filter(e => e.years === 15)])
// }

  // const setYearsFilter = years => {
  //   setDatalist([...data.filter(e => e.years === years)])
  // }

  const renderNumberData = ({ item,index }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Pressable style={item.id===selectedId?styles.selected:styles.unSelected} onPress={() => filter(item.id)}>
        <View>
          <Text style={item.id===selectedId?styles.white:styles.black}>{item.id}학번</Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item,index }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("noteUser", {
          name: item.name,
          years: item.years,
          userStatus: item.userStatus
        })}
        style={{ marginTop: 10, borderWidth: 2, paddingVertical: win.height / 50, width: "30%", marginLeft: "10%" }}
      >
        <View>
          <Text>이름:{item.name}</Text>
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
        <Pressable  onPress={() => navigation.replace("noteEnrolled")} style={styles.unPushed}>
          <Text>재학생(기수별)</Text>
        </Pressable>
        <Pressable  style={styles.pushed}>
          <Text>졸업생</Text>
        </Pressable>
        
        {/* {numberData.map((val) => {
          return (
            <View>
              <Text key={val.id}>{val.id}</Text>
            </View>
          )})} */}

      </View>
      <View style={styles.introbox}>
      <FlatList
        key={'_'}
        data={numberData}
        renderItem={renderNumberData}
        keyExtractor={item => "_" + item.id}
        horizontal={false}
          numColumns={5}
      />
        <FlatList
        key={'#'}
          data={datalist}
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
    // alignItems:"center",
    // justifyContent:"center",
    marginLeft: win.width / 20,
    marginTop: win.height / 60
  },
  red: {
    backgroundColor: "red"
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
  selected:{
    backgroundColor:"green",
    width:"19%",
    alignItems:"center",
    borderWidth:1,
    marginLeft:"0.8%",
    marginTop:"2%"
  },
  unSelected:{
    backgroundColor:"white",
    width:"19%",
    alignItems:"center",
    borderWidth:1,
    marginLeft:"0.8%",
    marginTop:"2%"

  },
  white:{
    color:"white"
  },
  black:{
    color:"black"
  }
});