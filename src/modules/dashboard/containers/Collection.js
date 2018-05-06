import React from 'react';
import {connect} from 'react-redux';
import Collection from '../components/Collection';
import {actions as dashboardActions} from '../ducks/dashboard';

const mapStateToProps = (state, ownProps) => {
  const {notes, folders} = state.dashboard;

  return {
    notes,
    folders
  }
}
const dispatchToProps = (dispatch, ownProps) => {
  return {
    onNoteClick: (id, folderId, event) => {
      console.log('onNoteClick', id);
      event.stopPropagation();
      dispatch(dashboardActions.updateSelected({
        noteId: id,
        folderId
      }))
      
    },
    onFolderClick: (id) => {
      console.log('onFolderClick', id);
      dispatch(dashboardActions.updateSelected({
        folderId: id
      }))
      dispatch(dashboardActions.fetchFolderDetails(id))
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(Collection);