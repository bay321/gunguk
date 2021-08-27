import React, {useState, useEffect} from 'react';
import {ActivityIndicator,View,StyleSheet,Image} from 'react-native';
import { AsyncStorage } from 'react-native';

export default function SplashScreen({navigation}){
    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);
          //Check if user_id is set or not
          //If not then send for Authentication
          //else send to Home Screen
          AsyncStorage.getItem('nickname').then((value) =>
            navigation.replace(
              value === null ? 'Auth' : 'drawer'
            ),
          );
        }, 5000);
      }, []);
    return(
        <View>
            <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#307ecc',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  });