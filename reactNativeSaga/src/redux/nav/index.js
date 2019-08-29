/**
 * @file : index.js
 * @description : Nav Reducer
 * @date : 28.May.2019
 * @author :Monika Rani
 */

import { NavigationActions, StackActions } from 'react-navigation';
import { AppNavigator } from '../../config/Navigator';
import { REHYDRATE } from 'redux-persist';
import Idx from 'idx';

// import { createNavigationReducer } from 'react-navigation-redux-helpers';
// export default navReducer = createNavigationReducer(AppNavigator);

import * as Actions from './constants';

const initialRoute = 'Loader';

const initialState = AppNavigator.router.getStateForAction(
	StackActions.reset({
		index: 0,
		actions: [
			NavigationActions.navigate({
				routeName: initialRoute
			})
		]
	})
);

export default function reducer(state = initialState, action) {
	let firstState = 'Login';

	// if user logged in
	if (Idx(action, _ => _.payload.user.isLoggedIn)) {
		firstState = 'Dashboard';
	}

	switch (action.type) {

		case REHYDRATE:
			return AppNavigator.router.getStateForAction(
				StackActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({
							routeName: firstState
						})
					]
				}),
				state
			);

		case Actions.Reset:
			return AppNavigator.router.getStateForAction(
				StackActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({
							routeName: action.payload.routeName
						})
					]
				}),
				state
			);

		case Actions.GOTO:
			return AppNavigator.router.getStateForAction(
				NavigationActions.navigate({
					routeName: action.payload.routeName,
					params: action.payload.params || {}
				}),
				state
			);

		case Actions.GOBACK:
			return AppNavigator.router.getStateForAction(NavigationActions.back(), state);

		default:
			return AppNavigator.router.getStateForAction(action, state);
	}
}
