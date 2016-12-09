export const userSignIn = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `${BASE_URL}/api/user/${id}`,
      success: (user) => {
        dispatch({
          type: 'USER_SIGN_IN',
          payload: {
            user: user}
        })
      }
    })
  }
}
