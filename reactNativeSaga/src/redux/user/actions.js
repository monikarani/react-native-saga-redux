import * as Actions from './types';
import { goTo, reset } from '../nav/actions';
import { ToastActionsCreators } from 'react-native-redux-toast';
// // import Constants from '../../constants';
import { handleLoader } from '../app/actions';
export const songList = payload => ({ type: Actions.MUSIC, payload });

