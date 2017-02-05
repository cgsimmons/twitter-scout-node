import $ from 'jquery';
import { setScheduledListArray } from './ScheduledListActions';

const BASE_URL = 'http://127.0.0.1:3000';

export function setCounter(num) {
  return {
    type: 'SET_COUNTER',
    count: num,
  };
}

export function setSelectedList(list) {
  return {
    type: 'SET_SELECTED_LIST',
    selection: list,
  };
}

export function setScheduledTweetBody(body) {
  return {
    type: 'SET_SCHEDULED_TWEET_BODY',
    body,
  };
}

export function setScheduledTweetPostDate(date) {
  return {
    type: 'SET_SCHEDULED_TWEET_POSTDATE',
    date,
  };
}

export function setScheduledTweet(tweet) {
  return {
    type: 'SET_SCHEDULED_TWEET',
    tweet,
  };
}

export function resetScheduledTweet() {
  return {
    type: 'RESET_SCHEDULED_TWEET',
  };
}

function updateScheduledListPostDate(listArray, listId) {
  for (let i = 0; i < listArray.length; i += 1) {
    if ((listArray[i]._id === listId) && (listArray[i].startDate !== null)) {
      const newDate = new Date(listArray[i].startDate);
      let lastPostDate = new Date();
      if (listArray[i].tweets.length > 0) {
        lastPostDate = new Date(listArray[i].tweets[listArray[i].tweets.length - 1].postDate);
      }

      switch (listArray[i].interval) {
        case 'Day':
          while ((newDate < Date.now()) || (newDate <= lastPostDate)) {
            newDate.setDate(newDate.getDate() + 1);
          }
          break;
        case 'Week':
          while ((newDate < Date.now()) || (newDate <= lastPostDate)) {
            newDate.setDate(newDate.getDate() + 7);
          }
          break;
        case 'Month':
          while ((newDate < Date.now()) || (newDate <= lastPostDate)) {
            newDate.setMonth(newDate.getMonth() + 1);
          }
          break;
        default:
          break;
      }
      return newDate;
    }
  }
  return new Date();
}

export function saveScheduledTweet(tweet) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: `${BASE_URL}/api/scheduled-list/tweet`,
      data: { newTweet: tweet },
      success: (newArray) => {
        dispatch(resetScheduledTweet());
        dispatch(setScheduledListArray(newArray));
        console.log('success saving new tweet');
        dispatch(
          setScheduledTweetPostDate(
            updateScheduledListPostDate(newArray, tweet.selectedList)));
      },
      error: (XMLHttpRequest, textStatus) => {
        console.log(textStatus);
      },
    });
  };
}
