export function tweetCounter(state = 140, action) {
  switch (action.type) {
    case 'SET_COUNTER':
      return action.count;
    default:
      return state;
  }
}
