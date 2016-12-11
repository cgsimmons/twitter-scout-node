import { combineReducers } from 'redux';
import { user, userId, userHasErrored, userIsLoading, userIsSignedIn } from './UserReducers';

export default combineReducers({
  user,
  userId,
  userHasErrored,
  userIsLoading,
  userIsSignedIn
});
