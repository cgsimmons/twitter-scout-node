import { combineReducers } from 'redux';
import { user, userHasErrored, userIsLoading, userIsSignedIn } from './UserReducers';

export default combineReducers({
  user,
  userHasErrored,
  userIsLoading,
  userIsSignedIn
});
