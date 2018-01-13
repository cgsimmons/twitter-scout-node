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
export function userId(state = '', action) {
    switch (action.type) {
    case 'SET_USER_ID':
        return action.userId;
    case 'REMOVE_USER_ID':
        return action.userId;
    default:
        return state;
    }
}

export function userTags(state = [], action) {
    let i = 0;
    switch (action.type) {
    case 'SET_USER_TAGS':
        return action.userTags;
    case 'ADD_USER_TAG':
        return [
            ...state,
            {
                id: state.length + 1,
                text: action.text,
            },
        ];
    case 'REMOVE_USER_TAG':
        i = action.userTagIndex;
        return [
            ...state.slice(0, i),
            ...state.slice(i + 1).map(
          (item, index) => { return { id: index + i + 1, text: item.text }; },
        ),
        ];
    default:
        return state;
    }
}

export function user(state = {}, action) {
    switch (action.type) {
    case 'USER_AJAX_SUCCESS':
        return action.user;
    case 'REMOVE_USER':
        return action.user;
    default:
        return state;
    }
}
