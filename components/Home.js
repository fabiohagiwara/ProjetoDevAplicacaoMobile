import React from 'react';
import {StyleSheet, View, Image, ActivityIndicator, Text, StatusBar, TouchableOpacity, Button} from 'react-native';
import { useHistory } from 'react-router';


export const Home = () => {

    let history = useHistory();

    return(
      <View style={styles.container} onTouchStart={() => history.push('/loading')}>
          <Image source={{uri:'https://i.imgur.com/XToiemw.png'}} style={styles.logo}/>
          <Text style={styles.texto}>I'll give you memes</Text>
          <Text style={styles.continue}>Tap to continue</Text>
          <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 15,
    alignItems: 'center',
    top: -80,
  },
  continue: {
    fontSize: 12,
    color: 'white',
    top: 170,
  },
  logo: {
    width: 150,
    height: 150,
    top: -50,
  },
});