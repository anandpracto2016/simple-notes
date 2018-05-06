import React from 'react';
import Collection from './containers/Collection';
import ShowNote from './components/ShowNote.jsx';
import EditNote from './components/EditNote.jsx';
import Modals from './containers/ModalWrapper';
import {connect} from 'react-redux';
import {actions} from '../dashboard/ducks/dashboard';

const Dashboard = (props) => {
  return (
    <div className='u-cushion--all'>
      <Modals/>
      <div className='o-media'>
        <div className='o-media--left c-list-wrapper'>
          <Collection/>
        </div>
        <div className="o-media-body o-media--right">
          <div className="u-pos-rel u-vh">
            <div>
              <ShowNote selectedEntity={props.selectedEntity} onEditNoteClick={props.onEditNoteClick}/>
            </div>
            <div style={{position:'absolute', top:0, right:0}}>
              <button className='u-cushion--all' onClick={props.onAddNoteClick}>Add new note</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedEntity: state.dashboard.selectedEntity
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    onAddNoteClick: () => {
      dispatch(actions.updateModal({
        currentModal: 'ADD_NOTE'
      }))
    },
    onEditNoteClick: () => {
      dispatch(actions.updateModal({
        currentModal: 'EDIT_NOTE',
        data: {
          selectedEntity: stateProps.selectedEntity
        }
      }))
    }
  }
}

export default connect(mapStateToProps, null, mergeProps)(Dashboard);