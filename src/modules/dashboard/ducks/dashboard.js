import request from 'superagent';
import getFormattedCollection from '../utils/getFormattedCollection';
import {formattedNotes} from '../utils/getFormattedCollection';

// ------------------------------------
// Constants
// ------------------------------------
const TYPES = {
  'FETCH_NOTES_FOLDERS': 'DB/FETCH_NOTES_FOLDERS',
  'UPDATE_LIST': 'DB/UPDATE_LIST',
  'UPDATE_SELECTED': 'DB/UPDATE_SELECTED',
  'UPDATE_MODAL': 'DB/UPDATE_MODAL',
  'UPDATE_FOLDER_LIST': 'DB/UPDATE_FOLDER_LIST' 
}

// ------------------------------------
// Actions
// ------------------------------------
const fetchNotesFolders = () => (dispatch, getState) => {
  let userId = window.userId;
  let url = '/api/v1/getNotesAndFolders/'+userId;
  request
    .get(url)
    .then(response => {
      console.log('getNotesAndFolders', response.body);
      const formattedData = getFormattedCollection(response.body.data);
      dispatch(updateList(formattedData));
      dispatch(updateSelected({
        noteId: response.body.data.notes[0].id
      }))
    })
    .catch(err => {
      console.log('getNotesAndFolders error ', err.message);
    })
}

const fetchFolderDetails = (id) => (dispatch, getState) => {
  let url = `/api/v1/getFolderDetails/${window.userId}/${id}`;

  request
    .get(url)
    .then(response => {
      console.log('getFolderDetails response ', response.body);
      const formattedData = formattedNotes(response.body.data);
      dispatch(updateFolderList({
        id,
        notes: formattedData
      }));
    })
    .catch(err => {
      console.log('getFolderDetails error ', err.message);      
    })
}

const updateList = payload => ({
  type: TYPES.UPDATE_LIST,
  payload
})

const updateFolderList = payload => ({
  type: TYPES.UPDATE_FOLDER_LIST,
  payload
})

const updateSelected = payload => ({
  type: TYPES.UPDATE_SELECTED,
  payload
})

const updateModal = payload => ({
  type: TYPES.UPDATE_MODAL,
  payload
})

export const actions = {
  fetchNotesFolders,
  updateList,
  updateSelected,
  updateModal,
  fetchFolderDetails,
  updateFolderList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const onUpdateList = (state, action) => {
  let {notes, folders} = action.payload;
  console.log('onUpdateList', action.payload);

  const _state = {
    ...state,
    notes,
    folders
  };

  return _state;
}

const onUpdateSelected = (state, action) => {
  let {noteId, type, folderId} = action.payload;

  const _state = {
    ...state,
    selectedEntity: {
      noteId: noteId,
      folderId: folderId
    }
  }

  return _state;
}

const onUpdateModal = (state, action) => {
  let {currentModal, data} = action.payload;

  const _state = {
    ...state,
    modal: {
      currentModal,
      data: data
    }
  };

  return _state;
}

const onUpdateFolderList = (state, action) => {
  let {id, notes} = action.payload;

  const _state = {
    ...state,
    folders: {
      ...state.folders,
      [id]: {
        ...state.folders[id],
        notes: notes
      }
    }
  };

  return _state;
}

const ACTION_HANDLERS = {
  [TYPES.UPDATE_LIST]: onUpdateList,
  [TYPES.UPDATE_SELECTED]: onUpdateSelected,
  [TYPES.UPDATE_MODAL]: onUpdateModal,
  [TYPES.UPDATE_FOLDER_LIST]: onUpdateFolderList
}

export const initialState = {
  notes: {},
  folders: {},
  selectedEntity: {
    noteId: 0,
    folderId: null
  },
  modal: {
    currentModal: null,
    data: {}
  }
}

export default function dashboardReducer (dashboard = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  var _state = Object.assign({}, dashboard);
  return handler ? handler(_state, action) : _state
}
