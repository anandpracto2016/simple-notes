import React from 'react';
import {connect} from 'react-redux';
import ModalWrapper from '../components/ModalWrapper';
import {actions} from '../ducks/dashboard';
import AddNote from '../components/AddNote';
import EditNote from '../components/EditNote';
import AddFolder from '../components/AddFolder';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'ADD_NOTE':
      return (
        <ModalWrapper {...props} position='center'>
          <AddNote {...props}/>
        </ModalWrapper>
      );
    case 'ADD_FOLDER':
      return (
        <ModalWrapper {...props} position='center'>
          <AddFolder {...props}/>
        </ModalWrapper>
      )
    case 'EDIT_NOTE':
      return (
        <ModalWrapper {...props} position='center'>
          <EditNote {...props}/>
        </ModalWrapper>
      );
    default:
      return null;
  }
}

const mapStateToProps = (state) => {
  return {
    currentModal: state.dashboard.modal.currentModal,
    data: state.dashboard.modal.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(actions.updateModal({
        currentModal: null,
        data: {}
      }));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ModalConductor);