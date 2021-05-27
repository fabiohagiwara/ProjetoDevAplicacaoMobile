import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { useHistory } from 'react-router';
import firebase from 'firebase';

export const Loading = () => {

    let history = useHistory();
    const checkLogIn = () => {

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                history.push('/meme');
            }
            else{
                history.push('/login');
            }
        })
    }

    checkLogIn();

    return(
        <View style={styles.container}>
            <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });