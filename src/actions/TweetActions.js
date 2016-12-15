
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

export function saveScheduledTweet(tweet, list) {
  return (dispatch) => {
    // 
    // $.ajax({
    //   type: 'POST',
    //   url: `${BASE_URL}/api/user/${list.userId}/scheduled-list/${}`,
    //   data: { newList: list },
    //   success: (newArray) => {
    //     dispatch(setScheduledListArray(newArray));
    //     dispatch(resetScheduledList());
    //     dispatch(scheduledListIsLoading(false));
    //   },
    //   error: (XMLHttpRequest, textStatus, errorThrown) => {
    //     console.log(textStatus);
    //   }
    // })
  }
}
