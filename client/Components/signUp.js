import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
const axios = require('axios');
const win = Dimensions.get('window');
// const bcrypt = require('bcrypt');

// const spec = async () => {
//     await axios.get('http://192.168.0.4:3001/api/get').then((response) => {
//         alert(response.data[5].id)
//     })
//     // alert("dfs")
// }



export default function signUp({navigation}) {
    const [userId, setUserId] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [userStatus, setUserStatus] = useState(undefined);
    const [years, setYears] = useState(undefined);
    const [userPassword, setUserPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    // bcrypt.hash("asdsad", 10, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash)
    // });
    

const signUpBtn = async () => {
    if( userPassword===passwordCheck){
      await axios.post('http://172.16.129.50:3001/signUp',{
        userId:userId,
        name:name,
        userStatus:userStatus,
        years:years,
        userPassword:userPassword
    }).then(()=> navigation.navigate('로그인'))
    .then(alert("회원가입이 성공적으로 되었습니다"))  
    navigation.navigate("Auth")
    }
    else{
        alert("패스워드를 다시 확인해주세요")
    }
    
}

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "white" }}>

            <View style={{ borderWidth: 1, width: win.width / 1.1, alignItems: "center", height: win.height / 2, marginTop: win.height / 20, borderRadius: 7, borderColor: "#C5C5C5" }}>
                <TextInput placeholder="아이디 입력" value={userId} onChangeText={text => { setUserId(text) }} style={styles.id} ></TextInput>
                <TextInput placeholder="비밀번호 입력" value={userPassword} onChangeText={text => { setUserPassword(text) }} style={styles.password} ></TextInput>
                <TextInput placeholder="비밀번호 확인" value={passwordCheck} onChangeText={text => { setPasswordCheck(text) }} style={styles.password} ></TextInput>
                <TextInput placeholder="이름" value={name} onChangeText={text => { setName(text) }} style={styles.password} ></TextInput>
                <TextInput placeholder="기수(숫자로만)" value={years} onChangeText={text => { setYears(text) }} style={styles.password} ></TextInput>
                <TextInput placeholder="재적상태(교수 or 재학생 or 졸업)" value={userStatus} onChangeText={text => { setUserStatus(text) }} style={styles.password} ></TextInput>
                <Text>{userId}</Text>
                <Text>{userPassword}</Text>
            </View>

            <Text onPress={() => { signUpBtn() }} style={styles.signUp}>회원가입하기</Text>

        </View>
    )
}


const styles = StyleSheet.create({
    id: {
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