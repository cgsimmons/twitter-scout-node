import { combineReducers } from 'redux';
import { user, userId, userTags, userHasErrored, userIsLoading, userIsSignedIn } from './UserReducers';
import { scheduledTweet } from './TweetReducers';
import { scheduledList, scheduledListArray, specialList } from './ScheduledListReducers';

export default combineReducers({
  user,
  userId,
  userTags,
  userHasErrored,
  userIsLoading,
  userIsSignedIn,
  scheduledTweet,
  scheduledList,
  scheduledListArray,
  specialList
});
