import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

export const Meme = () => {

    useEffect(() => {
        console.log("aa");
        loadMeme();
    })

    async function loadMeme(){
        fetch('https://meme-api.herokuapp.com/gimme/1').then((response) =>
        response.json()).then((json) => {
                console.log(json.memes[0].url);
        }).catch((error) => {
            console.error(error);
        });
    }

    let history = useHistory();
    return(
        <View style={styles.container} onTouchStart={() => {history.push("/")}}>
            <Text>
                teste
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
