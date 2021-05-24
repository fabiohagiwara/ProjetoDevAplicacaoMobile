import React from 'react';
import { NativeRouter, Route, Router, Switch } from "react-router-native";
import { Home } from './components/Home';
import { Meme } from './components/Meme';
import { Loading } from './components/Loading';
import { Login } from './components/Login';

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB3T4dDb85fLtB-dyvwUw7NjilRpuzDglY",
    authDomain: "gimmememe-c4fba.firebaseapp.com",
    projectId: "gimmememe-c4fba",
    storageBucket: "gimmememe-c4fba.appspot.com",
    messagingSenderId: "537888317066",
    appId: "1:537888317066:web:795c65a84f2dd39fbd5773",
    measurementId: "G-3MG8YKFVSG"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/meme" component={Meme} />
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/login" component={Login}/>
      </Switch>
    </NativeRouter>
  );
}