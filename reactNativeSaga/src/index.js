import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'


import configureStore from './config/configureStore';
import AppWithNavigationState from './config/Navigator';

/**
 * @function: Configuring redux store.
 * */
const { store, persistor } = configureStore();

export default class Application extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    console.disableYellowBox=true
  }
 
  render() {
    return (
      <Provider store={store}>
        {/* loading here can be null or you can pass any loading view or splash screen here */}
        <PersistGate losading={null} persistor={persistor}>   
          <View style={styles.container}>
            <AppWithNavigationState/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});