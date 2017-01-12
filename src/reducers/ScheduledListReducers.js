const initialState = {
  hasErrored:    false,
  isLoading:     false,
  title:         '',
  startDate:     new Date(),
  interval:      'Day',
  userId:        '',
};
const resetState = {
  hasErrored:    false,
  isLoading:     false,
  title:         '',
  startDate:     new Date(),
  interval:      'Day'
};

export function scheduledList(state = initialState, action) {
  switch (action.type) {
    case 'SCHEDULED_LIST_HAS_ERRORED':
      return {...state, hasErrored: action.hasErrored};
    case 'SCHEDULED_LIST_IS_LOADING':
      return {...state, isLoading: action.isLoading};
    case 'SET_SCHEDULED_LIST_TITLE':
      return {...state, title: action.title};
    case 'SET_SCHEDULED_LIST_START_DATE':
      return {...state, startDate: action.startDate};
    case 'SET_SCHEDULED_LIST_INTERVAL':
      return {...state, interval: action.interval};
    case 'SET_SCHEDULED_LIST_USER_ID':
      return {...state, userId: action.userId};
    case 'RESET_SCHEDULED_LIST':
      return {...state,...resetState};
    default:
      return state;
  }
}

export function scheduledListArray(state = [], action) {
  switch (action.type) {
    case 'SET_SCHEDULED_LIST_ARRAY':
      return action.listArray;
    case 'ADD_SCHEDULED_LIST_TO_ARRAY':
      return [
        ...state,
        {
          title:      action.title,
          startDate:  action.startDate,
          interval:   action.interval,
          userId:     action.userId
        }
      ];
    case 'REMOVE_SCHEDULED_LIST_FROM_ARRAY':
      const i = state.findIndex(x => x.title === action.title);
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];
    default:
      return state;
  }
}
