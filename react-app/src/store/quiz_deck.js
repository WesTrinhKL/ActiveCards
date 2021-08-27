// works with the quiz template api to add data to the store and update data
const CREATE_QUIZ_DECK_TEMPLATE = 'quizdeck/create'
const UPDATE_QUIZ_DECK_TEMPLATE = 'quizdeck/update'
const DELETE_QUIZ_DECK_TEMPLATE = 'quizdeck/delete'
const GET_SINGLE_QUIZ_DECK_TEMPLATE_WITH_CARDS = 'quizdeck/get/single-with-all-cards'
// to add: get all deck (just template) for given directory
// to add: get all deck (just template) for a given user
const GET_ALL_QUIZ_DECK_TEMPLATE_FOR_GIVEN_USER = 'quizdeck/get/all-templatesonly-for-user'

const createQuizDeckTemp = (payload) => ({
  type: CREATE_QUIZ_DECK_TEMPLATE,
  payload,
});

const updateQuizDeckTemp = (payload) => ({
  type: UPDATE_QUIZ_DECK_TEMPLATE,
  payload,
});
const deleteQuizDeckTemp = (payload) => ({
  type: DELETE_QUIZ_DECK_TEMPLATE,
  payload,
});

const GetQuizDeckTempById = (payload) => ({
  type: GET_SINGLE_QUIZ_DECK_TEMPLATE_WITH_CARDS,
  payload,
});

const GetAllTemplatesBelongToUser = (payload) => ({
  type: GET_ALL_QUIZ_DECK_TEMPLATE_FOR_GIVEN_USER,
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

export const updateFormQuizDeckTempThunk = (payload) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
    if (response.ok) {
        const data = await response.json();
        await dispatch(updateQuizDeckTemp(data));
        return data;
    } else {
        return ['An error occurred. Please try again.'];
    }
}

export const deleteFormQuizDeckTempThunk = (id) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/${id}`, {
    method: 'DELETE',

  });
    if (response.ok) {
        const data = await response.json();
        await dispatch(deleteQuizDeckTemp(data));
        return data;
    } else {
        return ['An error occurred. Please try again.'];
    }
}
export const getSingleDeckWithCardsByIdThunk = (id) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/${id}`);
    if (response.ok) {
        const data = await response.json();
        await dispatch(GetQuizDeckTempById(data));
        return data;
    } else {
        return ['An server error occurred and your request could not be processed. Please try again.'];
    }
}
export const getAllDecksForGivenUserIdThunk = (user_id) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/templates/users/${user_id}`);
    if (response.ok) {
        const data = await response.json();
        await dispatch(GetAllTemplatesBelongToUser(data));
        return data;
    } else {
        return ['An server error occurred and your request could not be processed. Please try again.'];
    }
}
/* ----- REDUCERS ------ */

const initialState = {

  newly_created_deck: null,
  single_deck_with_cards: null,
  all_templates_belong_to_user: null,
};
export default function reducer (state=initialState, action){
  let newState = {...state};
  switch (action.type) {
    case CREATE_QUIZ_DECK_TEMPLATE:{
      newState.newly_created_deck = action.payload;
      return newState;
    }
    case UPDATE_QUIZ_DECK_TEMPLATE:{
      // updates the one the user is editing
      newState.single_deck_with_cards = action.payload;
      return newState;
    }
    case DELETE_QUIZ_DECK_TEMPLATE:{
      delete newState.single_deck_with_cards;
      return newState;
    }
    case GET_SINGLE_QUIZ_DECK_TEMPLATE_WITH_CARDS:{
      newState.single_deck_with_cards = action.payload;
      return newState;
    }
    case GET_ALL_QUIZ_DECK_TEMPLATE_FOR_GIVEN_USER:{
      newState.all_templates_belong_to_user = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
