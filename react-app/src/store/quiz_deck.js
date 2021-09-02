// works with the quiz template api to add data to the store and update data
const CREATE_QUIZ_DECK_TEMPLATE = 'quizdeck/create'
const UPDATE_QUIZ_DECK_TEMPLATE = 'quizdeck/update'
const DELETE_QUIZ_DECK_TEMPLATE = 'quizdeck/delete'
const GET_SINGLE_QUIZ_DECK_TEMPLATE_WITH_CARDS = 'quizdeck/get/single-with-all-cards'
// to add: get all deck (just template) for given directory
// to add: get all deck (just template) for a given user
const GET_ALL_QUIZ_DECK_TEMPLATE_FOR_GIVEN_USER = 'quizdeck/get/all-templatesonly-for-user'
const GET_PAGINATED_DECK_COVER_DETAILS = 'quizdeck/get/deckcovers-paginated'

const CREATE_RECALL_ANSWER_FOR_USER_ON_CARD = 'api/quizzes/active-recall/answer'

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
const getPaginatedDeckCover = (payload) => ({
  type: GET_PAGINATED_DECK_COVER_DETAILS,
  payload,
});

const createRecallAnswerForUser= (payload) => ({
  type: CREATE_RECALL_ANSWER_FOR_USER_ON_CARD,
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
        const payload = await response.json();
        await dispatch(updateQuizDeckTemp(payload));
        return payload;
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
        return {'error': ['An error occurred. Cannot delete, please try again later.']}
    }
}
export const getSingleDeckWithCardsByIdThunk = (id) => async(dispatch) =>{
  const catchError = error =>{
    console.log("data error pre processed", error)
    // console.log("data error json", error)
  }
  const response = await fetch(`/api/quizzes/${id}`);
    if (!response.ok) {
        catchError(response);
        await dispatch(GetQuizDeckTempById({"errors":"not found!"}));
        return ['An server error occurred and your request could not be processed. Please try again.'];
    } else {
        const data = await response.json();
        await dispatch(GetQuizDeckTempById(data));
        return data;
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

export const getAllDeckCoversPaginatedThunk = (page) => async(dispatch) =>{
  const response = await fetch(`/api/quizzes/page/${page}`);

    if (!response.ok) {
      const errorObj = await response.json();
      if (errorObj){
        return errorObj
      }
      return {'errors':'An error occurred. Please try again.'}
    } else {
        const data = await response.json();
        await dispatch(getPaginatedDeckCover(data));
        return data;
    }
}


export const setNewActiveRecallAnswer = (payload) => async (dispatch) => {
  const response = await fetch(`/api/quizzes/active-recall/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
      const payload = await response.json();
      await dispatch(createRecallAnswerForUser(payload));
      return payload;
  } else {
      return ['An error occurred. Cannot create answer. Please try again.']
  }
}

/* ----- REDUCERS ------ */

const initialState = {

  newly_created_deck: null,
  single_deck_with_cards: null,
  all_templates_belong_to_user: null,
  createdActiveRecallAnswer: null,

  all_deck_covers_paginated: null,  // 'quizzes': [{},...]

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
    case GET_PAGINATED_DECK_COVER_DETAILS:{
      newState.all_deck_covers_paginated = action.payload;
      return newState;
    }
    case CREATE_RECALL_ANSWER_FOR_USER_ON_CARD:{
      newState.createdActiveRecallAnswer = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
