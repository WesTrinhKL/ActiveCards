// ---------workspace actions---------
const CREATE_WORKSPACE = 'workspace/create'
const UPDATE_WORKSPACE = 'workspace/update'
const DELETE_WORKSPACE = 'workspace/delete'

const GET_USER_MAIN_WORKSPACE = 'workspace/get-user-workspace' // this will get all the workspaces + directories + deck covers
const GET_SINGLE_WORKSPACE = 'workspace/get-user-workspace'

// ---------directories actions---------
const CREATE_DIRECTORY = 'DIRECTORY/create'
const UPDATE_DIRECTORY = 'DIRECTORY/update'
const DELETE_DIRECTORY = 'DIRECTORY/delete'

const GET_ALL_DECKS_FOR_DIR_ID ='DIRECTORY/get-user-decks-for-dir'//id
const GET_ALL_USERS_DECKS_DEFAULT ='DIRECTORY/get-decks/default' //default
const GET_ALL_USERS_DECKS_RECENT ='DIRECTORY/get-decks/recent' //recent

// const updateWorkspace = (payload) => ({
//   type: UPDATE_QUIZ_DECK_TEMPLATE,
//   payload,
// });
// const deleteWorkspace = (payload) => ({
//   type: DELETE_QUIZ_DECK_TEMPLATE,
//   payload,
// });

const GetMainWorkspaceById = (payload) => ({
  type: GET_SINGLE_WORKSPACE,
  payload,
});

const getAllWorkspace = (payload) => ({
  type: GET_USER_MAIN_WORKSPACE,
  payload,
});

const createWorkspace = (payload) => ({
  type: CREATE_WORKSPACE,
  payload,
})

const getAllUsersDecksDefaultDirectory = (payload) =>({
  type: GET_ALL_USERS_DECKS_DEFAULT,
  payload,
})

const deleteDirectory = (payload) => ({
  type: DELETE_DIRECTORY,
  payload,
})
const createDir = (payload) => ({
  type: CREATE_DIRECTORY,
  payload,
})

export const GetMainWorkspaceByIdThunk = (id) => async(dispatch) =>{

  const response = await fetch(`/api/directories/workspace/${id}`);
    if (!response.ok) {
        const errorObj = await response.json();
        if (errorObj){
          return errorObj
        }
        return {'errors':'An error occurred. Please try again.'}
    } else {
        const data = await response.json();
        await dispatch(GetMainWorkspaceById(data));
        return data;
    }
}
export const getAllWorkspaceThunk = () => async(dispatch) =>{

  const response = await fetch(`/api/directories/workspace`);
    if (!response.ok) {
        const errorObj = await response.json();
        if (errorObj){
          return errorObj
        }
        return {'errors':'An error occurred. Please try again.'}
    } else {
        const data = await response.json();
        await dispatch(getAllWorkspace(data));
        return data;
    }
}
export const getAllUsersDecksDefaultDirectoryThunk = () => async(dispatch) =>{

  const response = await fetch(`/api/directories/directory/default`);
    if (!response.ok) {
        const errorObj = await response.json();
        if (errorObj){
          return errorObj
        }
        return {'errors':'An error occurred. Please try again.'}
    } else {
        const data = await response.json();
        await dispatch(getAllUsersDecksDefaultDirectory(data));
        return data;
    }
}

export const createWorkspaceThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/directories/workspace`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorObj = await response.json();
    if (errorObj) return errorObj
    return {'errors':'An error occurred. Please try again.'}
  } else {
    const payload = await response.json();
    await dispatch(getAllWorkspaceThunk());
    return payload;
  }
}

export const deleteDirectoryThunk = (id) => async () => {
  const response = await fetch(`/api/directories/directory/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorObj = await response.json();
    if (errorObj) return errorObj
    return {'errors':'An error occurred. Please try again.'}
  } else {
    return {'success': `deleted directory successfully`};
  }
}

export const createDirThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/directories/directory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorObj = await response.json();
    if (errorObj) return errorObj
    return {'errors':'An error occurred. Please try again.'}
  } else {
    const payload = await response.json();
    await dispatch(getAllWorkspaceThunk());
    return payload;
  }
}

const initialState = {
  all_workspace_and_children: null,
  single_workspace_and_children: null,
  default_deck: null,


};
export default function reducer (state=initialState, action){
  let newState = {...state};
  switch (action.type) {
    case GET_USER_MAIN_WORKSPACE:{
      newState.all_workspace_and_children = action.payload;
      return newState;
    }
    case GET_SINGLE_WORKSPACE:{
      newState.single_workspace_and_children = action.payload;
      return newState;
    }
    case CREATE_WORKSPACE:{
      newState.single_workspace_and_children = action.payload;
      return newState;
    }
    case GET_ALL_USERS_DECKS_DEFAULT:{
      newState.default_deck = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
