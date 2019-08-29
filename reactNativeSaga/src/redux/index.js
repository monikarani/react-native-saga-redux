/**
 * @file: Root.js
 * @description: Combine all reducers with persist configurations.
 * @date: 28.May.2019
 * @author:Monika Rani
 * */

import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers } from 'redux-persist';

import app from './app';
import nav from './nav';
import user from './user';
import todos from './todos';
import ipInfo from './ipInfo';
const config = {
	key: 'primary',
	storage: AsyncStorage,
	blacklist: ['app','nav'],
};

export default function getRootReducer() {
	return persistCombineReducers(config, {
		app,
		nav,
		user,
		todos,
		ipInfo
	});
}
