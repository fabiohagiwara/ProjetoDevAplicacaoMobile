import React from 'react';
import { NativeRouter, Route, Switch } from "react-router-native";
import { Home } from './components/Home';
import { Meme } from './components/Meme';

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/meme" component={Meme} />
      </Switch>
    </NativeRouter>
  );
}