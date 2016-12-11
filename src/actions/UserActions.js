import $ from 'jquery';

export function userHasErrored(bool) {
  return {
    type: 'USER_HAS_ERRORED',
    hasErrored: bool
  };
}
export function userIsLoading(bool) {
  return {
    type: 'USER_IS_LOADING',
    isLoading: bool
  };
}
export function userIsSignedIn(bool) {
  return {
    type: 'USER_IS_SIGNED_IN',
    isSignedIn: bool
  };
}
export function userId(userId) {
  return {
    type: 'USER_ID',
    userId: userId
  }
}
export function userAjaxSuccess(user) {
  return {
    type: 'USER_AJAX_SUCCESS',
    user: user
  };
}

export function setUserId(id) {
  return (dispatch) => {
    dispatch(userId(id));
  }
}

export function userSignIn(url) {
  return (dispatch) => {
    dispatch(userIsLoading(true));
    dispatch(userIsSignedIn(true));

    $.ajax({
      url: `${url}`,
      success: (user) => {
        dispatch(userIsLoading(false));
        dispatch(userAjaxSuccess(user));
        dispatch(userId(user._id));
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        dispatch(userHasErrored(true));
        dispatch(userIsSignedIn(false));
      }
    })
  }
}
