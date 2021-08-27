// works with the quiz template api to add data to the store and update data
const CREATE_QUIZ_DECK_TEMPLATE = 'quizdeck/create'


const createQuizDeckTemp = (payload) => ({
  type: CREATE_QUIZ_DECK_TEMPLATE,
  payload,
});


export const setFormQuizDeckTemp = (payload) => async (dispatch) => {
  const response = await fetch(`/api/quizzes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });


  if (response.ok) {
      const payload = await response.json();
      await dispatch(createQuizDeckTemp(payload));
      return payload;
  } else {
      return ['An error occurred. Cannot create. Please try again.']
  }
}


/* ----- REDUCERS ------ */
const initialState = {

  newly_created_deck: null,
};
export default function reducer (state=initialState, action){
  let newState = {...state};
  switch (action.type) {
    case CREATE_QUIZ_DECK_TEMPLATE:{
      newState.newly_created_deck = action.payload;
      return newState;
    }

    default:
      return state;
  }
}
