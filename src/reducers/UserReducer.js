const INITIAL_STATE = {
  user: {}
}

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case 'USER_SIGN_IN':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
