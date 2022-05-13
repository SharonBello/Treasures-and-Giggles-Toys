export function inc() {
    return dispatch => {
      dispatch({type: 'INC'})
    }
  }