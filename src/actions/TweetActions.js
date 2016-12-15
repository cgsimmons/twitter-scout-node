import $ from 'jquery';
const BASE_URL = 'http://127.0.0.1:3000';

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

export function setScheduledTweetBody(body) {
  return {
    type: 'SET_SCHEDULED_TWEET_BODY',
    body: body
  }
}

export function setScheduledTweet(tweet){
  return {
    type: 'SET_SCHEDULED_TWEET',
    tweet: tweet
  }
}

export function resetScheduledTweet(){
  return {
    type: 'RESET_SCHEDULED_TWEET'
  }
}
