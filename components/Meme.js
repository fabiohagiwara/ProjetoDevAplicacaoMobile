import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Switch, Button} from 'react-native';
import firebase from 'firebase';
import { useHistory } from 'react-router';

export const Meme = () => {

    React.useEffect(() => {
        loadMeme();
    },[]);

    const [memeUrl, setMemeUrl] = React.useState(null);
    const [memeTitle, setMemeTitle] = React.useState(null)
    const [nsfwState, setnsfwState] = React.useState(false)

    async function loadMeme(){
        fetch('https://meme-api.herokuapp.com/gimme/1').then((response) =>
        response.json()).then((json) => {
                //console.log(json);
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
    
    const changeNSWF = () => {
        setnsfwState(previousState => !previousState);
        console.log(nsfwState);
    }
    

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
            <View style={styles.container} onTouchStart={() => {loadMeme()}}>
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
