// const INITIAL_STATE = {
//   user: {}
// }

// export function user(state = INITIAL_STATE, action){
//   switch(action.type) {
//     case 'USER_SIGN_IN':
//       return { ...state, user: action.payload };
//     default:
//       return state;
//   }
// }

export function userHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function userIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function user(state = {}, action) {
  switch (action.type) {
    case 'USER_AJAX_SUCCESS':
      return action.user;
    default:
      return state;
  }
}
