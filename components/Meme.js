import React from 'react';
import {Text, View, Image, StyleSheet, Switch, Button} from 'react-native';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import * as Notifications from 'expo-notifications';

export function Meme() {

    React.useEffect(() => {
        loadMeme();
        getUserPushToken();
        registerForPushNotificationsAsync();
    },[]);

    const [memeUrl, setMemeUrl] = React.useState(null);
    const [memeTitle, setMemeTitle] = React.useState(null);
    const [nsfwState, setnsfwState] = React.useState(false);
    const [countMemes, setCountMemes] = React.useState(0);
    const [pushToken, setPushToken] = React.useState(null);

    async function loadMeme(){
        fetch('https://meme-api.herokuapp.com/gimme/1').then((response) =>
        response.json()).then((json) => {
                if(json.memes[0].nsfw == true && nsfwState == false){
                    setMemeUrl('https://www.techtricknews.com/wp-content/uploads/2020/03/How-to-Turn-Off-NSFW-Filter-on-Reddit-iPhone-App.jpg');
                    setMemeTitle('nsfw blocked');
                }
                else{
                    setMemeUrl(json.memes[0].url);
                    setMemeTitle('r/'+ json.memes[0].subreddit + ' : "'+json.memes[0].title +'"');
                }
        }).catch((error) => {
            console.error(error);
        });
    }

    async function getUserPushToken(){
        let user = firebase.auth().currentUser;
            let userRef = firebase.database().ref('users/' + user.uid + '/push-token');
            userRef.on('value',(snapshot) => {
                const data = snapshot.val();
                setPushToken(data);
            })
    }

    const countMeme = () => {
        setCountMemes(countMemes + 1);
        if(countMemes == 10){
            let response = fetch('https://exp.host/--/api/v2/push/send',{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: pushToken,
                    sound: 'default',
                    title: 'Gimmememe',
                    body: 'Percebi que você está curtindo os memes, obrigado por utilizar o aplicativo!!'
                })
            })
        } 
    }
    
    const changeNSWF = () => {
        setnsfwState(previousState => !previousState);
        if(nsfwState == true){
            alert('Filtro NSFW desativado');
        }
        else{
            alert('Filtro NSFW ativado');
        }
    }
    
    async function registerForPushNotificationsAsync(){
          const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          console.log(status);
          if(status != "granted"){
              const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          }
          if(status != 'granted'){
              alert('Fail to get push token');
              return;
          }
          const token =  (await Notifications.getExpoPushTokenAsync()).data;

          let currentUser = firebase.auth().currentUser;
          firebase.database().ref('users/' + currentUser.uid + '/push-token').set(token);
        };

    let history = useHistory();
    return(
        <View style={{flex:1}}>
            <View style={styles.buttonView}>
                <Switch thumbColor={'white'} trackColor={{false: "red",true: "green"}} onChange={changeNSWF} value={nsfwState}></Switch>
                <Button title="sair" onPress={() => firebase.auth().signOut()} color='black' style={styles.button}></Button>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                        {memeTitle}
                </Text>
            </View>
            <View style={styles.container} onTouchStart={() => {loadMeme();countMeme()}}>
                <Image source={{uri: memeUrl}} style={styles.meme}></Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    button: {
        textAlign: 'right'
    },
    meme: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    titleView: {
        backgroundColor: 'black',
        alignItems: 'center'
    },
    buttonView: {
        backgroundColor: 'black',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white',
    },
})
