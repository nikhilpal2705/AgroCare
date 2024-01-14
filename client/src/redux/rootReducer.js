import { combineReducers } from 'redux';
import { reducer as crudReducer } from './crud';
import { reducer as authReducer } from './auth';

// Combine all reducers.

const rootReducer = combineReducers({
  auth: authReducer,
  crud: crudReducer,
});

export default rootReducer;
