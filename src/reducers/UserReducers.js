export function userHasErrored(state = false, action) {
  switch (action.type) {
    case 'USER_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function userIsLoading(state = true, action) {
  switch (action.type) {
    case 'USER_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function userIsSignedIn(state = false, action) {
  switch (action.type) {
    case 'USER_IS_SIGNED_IN':
      return action.isSignedIn;
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
