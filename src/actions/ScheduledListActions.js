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


export function saveScheduledList(list) {
  return (dispatch) => {
    dispatch(scheduledListIsLoading(true));

    $.ajax({
      type: 'POST',
      url: `${BASE_URL}/api/user/${list.userId}/scheduled-list`,
      data: { newList: list },
      success: () => {
        resetScheduledList();
        //TODO add list to array of lists
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        dispatch(scheduledListHasErrored(true));
        dispatch(scheduledListIsLoading(false));
      }
    })
  }
}
