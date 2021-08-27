const GET_FIRST_DIRECTORY_FOR_USER = 'directory/getfirst'


const setFirstDirectory = (payload) => ({
  type: GET_FIRST_DIRECTORY_FOR_USER,
  payload,
});


export const getUserFirstDirectory = () => async (dispatch) => {
  const response = await fetch(`/api/directories/first`);
  const payload = await response.json();

  if (response.ok) {
      await dispatch(setFirstDirectory(payload));
      return response;
  } else {
      return ['An error occurred. Cannot get first directory. Please try again.']
  }
}


/* ----- REDUCERS ------ */
const initialState = {
  directories:null,
  userFirstDirectory:null,
};
export default function reducer (state=initialState, action){
  let newState = {...state};
  switch (action.type) {
    case GET_FIRST_DIRECTORY_FOR_USER:{
      newState.userFirstDirectory = action.payload;
      return newState;
    }

    default:
      return state;
  }
}
