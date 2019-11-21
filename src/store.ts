import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  enhancer,
);

export default store;
