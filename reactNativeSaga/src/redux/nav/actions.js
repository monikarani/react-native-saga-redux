/**
 * @file : actions.js
 * @description : Nav actions
 * @date : 28.May.2019
 * @author :Monika Rani
 */

// Import required actions Actions
import * as Actions from './constants';

// Action Creators
export const goBack = () => ({ type: Actions.GOBACK });
export const reset = payload => ({ type: Actions.Reset, payload });
export const goTo = payload => ({ type: Actions.GOTO, payload });
