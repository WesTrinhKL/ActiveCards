// const CREATE_QUIZ_CARD = 'quizcard/create'

const GET_SINGLE_QUIZ_CARD = 'quizcard/get/singlecard'
const CREATE_QUIZ_CARD = 'quizcard/create'
const UPDATE_QUIZ_CARD = 'quizcard/update'
const DELETE_QUIZ_CARD = 'quizcard/delete'

// const CREATE_ACTIVE_RECALL_FOR_CARD = 'quizcard/active-recall/create'


const getSingleCard= (payload) => ({
  type: GET_SINGLE_QUIZ_CARD,
  payload,
});
const createQuizCard = (payload) => ({
  type: CREATE_QUIZ_CARD,
  payload,
});
const updateQuizCard = (payload) => ({
  type: UPDATE_QUIZ_CARD,
  payload,
});
const deleteQuizCard = (payload) => ({
  type: DELETE_QUIZ_CARD,
  payload,
});
// for active recall extension
// const createQuizCard = (payload) => ({
//   type: CREATE_QUIZ_CARD,
//   payload,
// });

export const setSingleCard = (card_id) => async (dispatch) => {
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

export const createQuizCardThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/quizzes/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  console.log("response", response)

  if (!response.ok) {
      const errorObj = await response.json();
      if (errorObj){
        // console.log(errorObj)
        return errorObj
      }
      return {'errors':'An error occurred. Cannot create card. Please try again.'}
  } else {
      const payload = await response.json();
      await dispatch(createQuizCard(payload));
      return payload;
  }
}

export const updateFormQuizDeckTempThunk = (payload) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/cards/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
    if (response.ok) {
        const payload = await response.json();
        await dispatch(updateQuizCard(payload));
        return payload;
    } else {
        return ['An error occurred. Please try again.'];
    }
}

export const deleteFormQuizDeckTempThunk = (id) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/cards/${id}`, {
    method: 'DELETE',
  });
    if (response.ok) {
        const data = await response.json();
        await dispatch(deleteQuizCard(data));
        return data;
    } else {
        return {'error': ['An error occurred. Cannot delete, please try again later.']}
    }
}



/* ----- REDUCERS ------ */

const initialState = {

  single_card_data: null,

};
export default function reducer (state=initialState, action){
  let newState = {...state};
  switch (action.type) {
    case GET_SINGLE_QUIZ_CARD:{
      newState.single_card_data = action.payload;
      return newState;
    }
    case CREATE_QUIZ_CARD:{
      newState.single_card_data = action.payload;
      return newState;
    }
    case UPDATE_QUIZ_CARD:{
      // updates the one the user is editing
      newState.single_card_data = action.payload;
      return newState;
    }
    case DELETE_QUIZ_CARD:{
      delete newState.single_card_data;
      return newState;
    }
    default:
      return state;
  }
}
