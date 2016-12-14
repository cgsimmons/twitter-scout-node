
export function setCounter(num){
  return {
    type: 'SET_COUNTER',
    count: num
  };
}

export function setSelectedList(list){
  return {
    type: 'SET_SELECTED_LIST',
    selection: list
  };
}

export function setScheduledTweet(tweet){
  return {
    type: 'SET_SCHEDULED_TWEET',
    tweet: tweet
  }
}

export function updateScheduledTweet(tweet){
  return {
    type: 'UPDATE_SCHEDULED_TWEET',
    tweet: tweet
  }
}
