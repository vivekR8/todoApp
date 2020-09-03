import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import TaskBar from './components/TaskBar/TaskBar'
import rootReducer from './redux/root-reducer';

const App=()=> {
  return (
    <Provider store={createStore(rootReducer)}>
      <View style={styles.container}>
        <TaskBar/>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    // width:100,
    // height:100,
    backgroundColor: '#ebe9e9',
    alignItems: 'center',
    width:Dimensions.get('window').width,
    

  },
});
