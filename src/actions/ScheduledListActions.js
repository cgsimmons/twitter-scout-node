import $ from 'jquery';
const BASE_URL = 'http://127.0.0.1:3000';

export function setScheduledListTitle(title) {
  return {
    type: 'SET_SCHEDULED_LIST_TITLE',
    title: title
  }
}
export function setScheduledListStartDate(date) {
  return {
    type: 'SET_SCHEDULED_LIST_START_DATE',
    startDate: date
  }
}
export function setScheduledListInterval(interval) {
  return {
    type: 'SET_SCHEDULED_LIST_INTERVAL',
    interval: interval
  }
}
export function scheduledListIsLoading(bool){
  return {
    type: 'SCHEDULED_LIST_IS_LOADING',
    isLoading: bool
  }
}
export function scheduledListHasErrored(bool){
  return {
    type: 'SCHEDULED_LIST_HAS_ERRORED',
    hasErrored: bool
  }
}
export function setScheduledListUserId(id){
  return {
    type: 'SET_SCHEDULED_LIST_USER_ID',
    userId: id
  }
}
export function resetScheduledList(){
  return {
    type: 'RESET_SCHEDULED_LIST'
  }
}

export function setScheduledListArray(newArray) {
  return {
    type: 'SET_SCHEDULED_LIST_ARRAY',
    listArray: newArray
  }
}

export function addScheduledListToArray(newList){
  return {
    type: 'ADD_SCHEDULED_LIST_TO_ARRAY',
    title:      newList.title,
    startDate:  newList.startDate,
    interval:   newList.interval,
    userId:     newList.userId
  }
}
export function removeScheduledListFromArray(listTitle){
  return {
    type: 'REMOVE_SCHEDULED_LIST_FROM_ARRAY',
    title: listTitle
  }
}

export function setSpecialList(id) {
  return {
    type: 'SET_SPECIAL_LIST',
    listId: id
  }
}

export function removeAndDeleteScheduledListArray(list){
  return (dispatch) => {
    dispatch(scheduledListIsLoading(true));

    $.ajax({
      type: 'POST',
      url: `${BASE_URL}/api/user/${list.userId}/scheduled-list/${list._id}`,
      success: (newArray) => {
        // dispatch(removeScheduledListFromArray(list.title));
        dispatch(setScheduledListArray(newArray));
        dispatch(scheduledListIsLoading(false));

      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        dispatch(scheduledListHasErrored(true));
        dispatch(scheduledListIsLoading(false));
      }
    })
  }
}

export function saveScheduledList(list) {
  return (dispatch) => {
    dispatch(scheduledListIsLoading(true));

    $.ajax({
      type: 'POST',
      url: `${BASE_URL}/api/user/${list.userId}/scheduled-list`,
      data: { newList: list },
      success: (newArray) => {
        dispatch(setScheduledListArray(newArray));
        dispatch(resetScheduledList());
        dispatch(scheduledListIsLoading(false));
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        dispatch(scheduledListHasErrored(true));
        dispatch(scheduledListIsLoading(false));
      }
    })
  }
}

export function getScheduledListArray(id) {
  return (dispatch) => {
    $.ajax({
      url: `${BASE_URL}/api/user/${id}/scheduled-lists`,
      success: (lists) => {
        dispatch(setScheduledListArray(lists));
        dispatch(setSpecialList(lists.filter((obj)=>{return obj.title==='Special Tweets';})[0]._id));

      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        alert(textStatus);
      }
    })
  }
}
