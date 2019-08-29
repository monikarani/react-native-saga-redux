/**
 * @file : index.js
 * @description : Application Reducer
 * @date : 28.May.2019
 * @author :Monika Rani
 */

import { LOADING_STOP, LOADING_START } from './constants';

const initialState = {
	isLoading: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOADING_STOP:
			return { ...state, isLoading: false };

		case LOADING_START:
			return { ...state, isLoading: true };

		default:
			return state;
	}
}
