/*
 * @file: index.js
 * @description: App Reducer
 * @date: 31.05.2019
 * @author: Monika Rani
 * */

'use strict';

// Import required actions Actions
import * as Actions from './types';

const initialState = {
	userDetails: null,
	deviceToken: 'test',
	isLoggedIn: false,
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Actions.LOGIN:
			return { ...state, isLoggedIn: true, userDetails:action.payload };
		case Actions.LOGOUT:
				return initialState;
		default:
			return state;
	}
}
