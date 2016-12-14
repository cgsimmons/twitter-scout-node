const INITIAL_TWEET_STATE = {
  body:     '',
  userId:   '',
  listName: 'Special Tweets',
  postDate: new Date(),
  posted:    false,
}

export function tweetCounter(state = 140, action) {
  switch (action.type) {
    case 'SET_COUNTER':
      return action.count;
    default:
      return state;
  }
}

export function selectedList(state = 'Special Tweets', action) {
  switch (action.type) {
    case 'SET_SELECTED_LIST':
      return action.selection;
    default:
      return state;
  }
}

export function scheduledTweet(state = INITIAL_TWEET_STATE, action){
  switch (action.type) {
    case 'SET_SCHEDULED_TWEET':
      return action.tweet;
    case 'UPDATE_SCHEDULED_TWEET':
      return {...state, ...action.tweet}
    default:
      return state;
  }
}
