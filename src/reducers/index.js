import { combineReducers } from 'redux';
import { user, userId, userTags, userHasErrored, userIsLoading, userIsSignedIn } from './UserReducers';

export default combineReducers({
  user,
  userId,
  userTags,
  userHasErrored,
  userIsLoading,
  userIsSignedIn
});
