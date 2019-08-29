import { applyMiddleware, createStore,compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import reducer from '../redux';
import devToolsEnhancer from 'remote-redux-devtools';
import sagaDemo from '../redux/saga';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const logger = store => next => action => {

	return next(action);
  };

/**
 * @function: Configuring and creating redux store
 * */
export default function configureStore() {
	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
	/**
	 * @function: Creating redux store
	 * */
	const store =process.env.NODE_ENV=='development' ?createStore(
		reducer(),
		composeEnhancer(applyMiddleware(sagaMiddleware))
	):createStore(reducer(), applyMiddleware(sagaMiddleware));

	/**
	 * @function: Persisting store for save all store's data except blacklisted reducers in device's memory
	 * */
    sagaMiddleware.run(sagaDemo)
	let persistor = persistStore(store);

	/**
	 * @return: returning store and storage persistor when it's successfully created
	 * */
	return { sagaMiddleware,persistor, store };
}
