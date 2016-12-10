import { combineReducers } from 'redux';
import { user, userHasErrored, userIsLoading } from './UserReducers';

export default combineReducers({
  user,
  userHasErrored,
  userIsLoading
});
