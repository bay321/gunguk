import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
// import 'react-native-gesture-handler';
import Axios from 'axios'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import drawer from './Components/drawer'
import login from './Components/login'
import signUp from './Components/signUp'
import SplashScreen from './Components/SplashScreen'
import { AsyncStorage } from 'react-native';
const Stack = createStackNavigator();
// const spec = async() => {
//   const response= await Axios.get("https://jsonplaceholder.typicode.com/posts")
//    .then (
//     console.log(response))
// }


// const spec = async () => {
//   // https://jsonplaceholder.typicode.com/todos/1
//   await Axios.get('http://192.168.56.1:3001/api/get').then((response) => {
//     alert(response.data[0].id)
//   })
//   // alert("dfs")
// }
 const Auth = ()=> {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="로그인">
      <Stack.Screen
        name="로그인"
        component={login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="회원가입"
        component={signUp}
        options={{
          title: '회원가입', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};



export default function App() {
  // const [userToken, setUserToken] = useState();
  //  AsyncStorage.getItem('nickname', (err, result) => {
  //     setUserToken(result)
  //     console.log(userToken)
    
  // });  


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
      {/* {userToken == "signedOut" ? (
        <> */}
        {/* <Stack.Screen name="로그인" component={login} />
        <Stack.Screen name="회원가입" component={signup} /> */}

        {/* <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} /> */}
        
        {/* </>
        ):(
          <> */}
        <Stack.Screen
         options={{ headerShown: false }}
         name="drawer" component={drawer} />
        <Stack.Screen options={{headerShown: false}} name="Auth" component={Auth} />
        {/* <Stack.Screen name="회원가입" component={signup} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        

        {/* </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
