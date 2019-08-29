/**
 * @file : Navigator.js
 * @description : Configure and connecting react navigation with redux store and routes
 * @date : 28.May.2019
 * @author :Monika Rani
 */

import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Routes from './Routes';
let user='';
const stackNavigatorConfiguration = {
	headerMode: 'none',
	// mode: 'card',
	navigationOptions: {
		gesturesEnabled: false
	}
};

 let navigator = createDrawerNavigator(Routes, stackNavigatorConfiguration);

 let AppNavigator = createAppContainer(navigator);

 const App = createReduxContainer(AppNavigator);

 const mapStateToProps = (state) =>({	 
	state: state.nav,
  });
const reduxMiddleware = createReactNavigationReduxMiddleware(
	state => state.nav,
  );
const AppWithNavigationState = connect(mapStateToProps)(App);

export { AppNavigator, reduxMiddleware };
export default AppWithNavigationState;

