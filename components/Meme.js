import React from 'react';
import {Text, View, Image, StyleSheet, ImageBackground} from 'react-native';
import { useHistory } from 'react-router';

export const Meme = () => {

    React.useEffect(() => {
        console.log("aa");
        loadMeme();
    },[]);

    const [memeUrl, setMemeUrl] = React.useState(null);
    const [memeTitle, setMemeTitle] = React.useState(null)

    async function loadMeme(){
        fetch('https://meme-api.herokuapp.com/gimme/1').then((response) =>
        response.json()).then((json) => {
                console.log(json);
                setMemeUrl(json.memes[0].url);
                setMemeTitle(json.memes[0].title);
        }).catch((error) => {
            console.error(error);
        });
    }

    let history = useHistory();
    return(
        <View style={styles.container} onTouchStart={() => {loadMeme()}}>
            <Text style={{color: 'white'}}>
                    {memeTitle}
            </Text>
            <ImageBackground source={{uri: memeUrl}} style={styles.meme}>
                
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    meme: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    title: {
        alignItems: 'center',
    }
})
