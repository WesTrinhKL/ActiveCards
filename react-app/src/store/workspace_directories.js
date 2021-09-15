// ---------workspace actions---------
const CREATE_WORKSPACE = 'workspace/create'
const UPDATE_WORKSPACE = 'workspace/update'
const DELETE_WORKSPACE = 'workspace/delete'

const GET_USER_MAIN_WORKSPACE = 'workspace/get-user-workspace'
// this will get all the workspaces + directories + deck covers


// ---------directories actions---------
const CREATE_DIRECTORY = 'DIRECTORY/create'
const UPDATE_DIRECTORY = 'DIRECTORY/update'
const DELETE_DIRECTORY = 'DIRECTORY/delete'

const GET_ALL_DECKS_FOR_GIVEN_DIRECTORY ='DIRECTORY/get-user-decks-for-dir'



const createWorkspace = (payload) => ({
  type: CREATE_WORKSPACE,
  payload,
})

const updateWorkspace = (payload) => ({
  type: UPDATE_QUIZ_DECK_TEMPLATE,
  payload,
});
const deleteWorkspace = (payload) => ({
  type: DELETE_QUIZ_DECK_TEMPLATE,
  payload,
});

const GetWorkspaceById = (payload) => ({
  type: GET_SINGLE_QUIZ_DECK_TEMPLATE_WITH_CARDS,
  payload,
});
