// const CREATE_QUIZ_CARD = 'quizcard/create'

const GET_SINGLE_QUIZ_CARD = 'quizcard/get/singlecard'


const getSingleCard= (payload) => ({
  type: GET_SINGLE_QUIZ_CARD,
  payload,
});

export const setSingleCard = (payload, card_id) => async (dispatch) => {
  const response = await fetch(`/api/cards/${card_id}`);

  if (response.ok) {
      const payload = await response.json();
      await dispatch(getSingleCard(payload));
      return payload;
  } else {
      // handle server errors here
      return ['An error occurred. Please try again.']
  }
}

/* ----- REDUCERS ------ */

const initialState = {

  singleDeckData: null,
};
export default function reducer (state=initialState, action){
  let newState = {...state};
  switch (action.type) {
    case GET_SINGLE_QUIZ_CARD:{
      newState.singleDeckData = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
