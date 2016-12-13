import { combineReducers } from 'redux';
import { user, userId, userTags, userHasErrored, userIsLoading, userIsSignedIn } from './UserReducers';
import { tweetCounter } from './TweetReducers';
import { scheduledList } from './ScheduledListReducers';

export default combineReducers({
  user,
  userId,
  userTags,
  userHasErrored,
  userIsLoading,
  userIsSignedIn,
  tweetCounter,
  scheduledList
});
