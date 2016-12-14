import { combineReducers } from 'redux';
import { user, userId, userTags, userHasErrored, userIsLoading, userIsSignedIn } from './UserReducers';
import { tweetCounter, selectedList } from './TweetReducers';
import { scheduledList, scheduledListArray } from './ScheduledListReducers';

export default combineReducers({
  user,
  userId,
  userTags,
  userHasErrored,
  userIsLoading,
  userIsSignedIn,
  tweetCounter,
  selectedList,
  scheduledList,
  scheduledListArray
});
