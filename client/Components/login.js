import React, { useState,useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { AsyncStorage } from 'react-native';
const axios = require('axios');
const win = Dimensions.get('window');

// async function spec() {
//     const response = await axios.get('http://192.168.0.4:3001/api/get');
//     alert(response.data);
// }



export default function login({ navigation }) {
    const [userId, setUserId] = useState(undefined);
    const [userPassword, setUserPassword] = useState("");





    const loginBtn = async() =>{
        const response = await axios.post('http://172.16.129.50:3001/login',{
            userId: userId,
            userPassword: userPassword}
        )
        // .then(function(response){
        //     if(response){
        //         alert(response.data[0].name)
        //     }else{
        //         alert("nop")
        //     }
        // })
        // .then((response)=>{console.log(response)})
        .then((response)=>{
            if(response.data[0])
            {

                if(response.data[0].authorized=="yes"){
            alert(response.data[0].name+" 님 반갑습니다")
            AsyncStorage.setItem('nickname',userId, () => {
            console.log(response.data[0].userId)
            });
            AsyncStorage.getItem('nickname', (_err, result) => {
                console.log(result); // User1 출력
              });  
            //   console.log(response.data[0])
                navigation.navigate("drawer")
                setUserId("")
        setUserPassword("")}else{
            alert("등록을 진행해주세요")
        }


        }
            else{
                alert("아이디 또는 비밀번호를 다시 입력해주세요")
            }})
        // .then(navigation.navigate("Home"))
    }
    
    // 유저 닉네임 저장

  
  // 유저 닉네임 불러오기
  const nick=()=>{

  }
  

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "white",marginTop:win.height/30 }}>

            <View style={{ borderWidth: 1, width: win.width / 1.1, alignItems: "center", height: win.height / 3.4, marginTop: win.height / 20, borderRadius: 7, borderColor: "#C5C5C5" }}>
                <TextInput placeholder="아이디 입력" value={userId} onChangeText={text => { setUserId(text) }} style={styles.id} ></TextInput>
                <TextInput placeholder="비밀번호 입력" value={userPassword} onChangeText={text => { setUserPassword(text) }} style={styles.password} ></TextInput>

                <Pressable style={styles.login} onPress={() => { loginBtn() }}>
                    <Text style={{ textAlign: "center", color: "white" }}>로그인</Text>
                </Pressable>
                <View style={{ flexDirection: "row", marginTop: win.height / 105 }}>
                    <Text style={{ width: "50%", textAlign: "center" }}>아이디/비밀번호 찾기</Text>
                    <Text style={{ width: "50%", textAlign: "center" }}>아이디 저장</Text>
                    {/* <Text>{password}</Text> */}
                </View>
            </View>

            <Text onPress={() => navigation.navigate("회원가입")} style={{ textAlign: "center", padding: win.height / 60, backgroundColor: "#F2F2F2", borderWidth: 0, width: win.width / 1.1, borderRadius: 7, marginTop: win.height / 35 }}>회원가입</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    login: {
        borderWidth: 0,
        width: "88%",
        marginTop: win.height / 135,
        padding: win.height / 60,
        backgroundColor: "#4882FF",
        borderRadius: 7, color: "#FFF"
    }, id: {
        borderWidth: 1,
        width: "88%",
        marginTop: win.height / 30,
        padding: win.height / 80,
        borderRadius: 7,
        color: "#C5C5C5",
        borderColor: "#C5C5C5"
    },
    password: {
        borderWidth: 1,
        width: "88%",
        marginTop: win.height / 135,
        padding: win.height / 80,
        borderRadius: 7,
        color: "#C5C5C5",
        borderColor: "#C5C5C5"
    },
    signUp: {
        textAlign: "center",
        padding: win.height / 60,
        backgroundColor: "#F2F2F2",
        borderWidth: 0,
        width: win.width / 1.1,
        borderRadius: 7,
        marginTop: win.height / 35
    }
}
);