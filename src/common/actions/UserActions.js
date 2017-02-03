import $ from 'jquery';

const BASE_URL = process.env.BASE_URL;

export function userHasErrored(bool) {
  return {
    type: 'USER_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function userIsLoading(bool) {
  return {
    type: 'USER_IS_LOADING',
    isLoading: bool,
  };
}
export function userIsSignedIn(bool) {
  return {
    type: 'USER_IS_SIGNED_IN',
    isSignedIn: bool,
  };
}

export function userAjaxSuccess(user) {
  return {
    type: 'USER_AJAX_SUCCESS',
    user,
  };
}

export function removeUser() {
  return {
    type: 'REMOVE_USER',
    user: {},
  };
}

export function setUserId(userId) {
  return {
    type: 'SET_USER_ID',
    userId,
  };
}

export function removeUserId() {
  return {
    type: 'REMOVE_USER_ID',
    userId: '',
  };
}

export function setUserTags(tags) {
  return {
    type: 'SET_USER_TAGS',
    userTags: tags,
  };
}

export function addUserTag(tag) {
  return {
    type: 'ADD_USER_TAG',
    text: tag,
  };
}
export function removeUserTag(index) {
  return {
    type: 'REMOVE_USER_TAG',
    userTagIndex: index,
  };
}

export function userUpdateTags(id, newTags) {
  return (dispatch) => {
    $.ajax({
      type: 'PUT',
      url: `${BASE_URL}/api/user/${id}/tags`,
      data: { tags: newTags },
      success: (user) => {
        dispatch(userIsLoading(false));
        dispatch(userAjaxSuccess(user));
      },
      error: () => {
        dispatch(userHasErrored(true));
      },
    });
  };
}

export function userSignIn(id) {
  return (dispatch) => {
    dispatch(userIsLoading(true));

    $.ajax({
      url: `${BASE_URL}/api/user/${id}`,
      success: (user) => {
        dispatch(userIsLoading(false));
        dispatch(userAjaxSuccess(user));
        dispatch(userIsSignedIn(true));
        if (typeof user.tags !== 'undefined') {
          dispatch(setUserTags(user.tags));
        } else {
          dispatch(setUserTags([]));
        }
      },
      error: () => {
        dispatch(userHasErrored(true));
        dispatch(userIsSignedIn(false));
      },
    });
  };
}
