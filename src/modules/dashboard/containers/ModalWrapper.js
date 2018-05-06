import React from 'react';
import {connect} from 'react-redux';
import ModalWrapper from '../components/ModalWrapper';
import {actions} from '../ducks/dashboard';
import AddNote from '../containers/AddNote';
import EditNote from '../components/EditNote';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'ADD_NOTE':
      return (
        <ModalWrapper {...props} position='center'>
          <AddNote {...props}/>
        </ModalWrapper>
      );
    case 'SHARE_NOTE':
      return (
        <ModalWrapper {...props} position='center'>
          <div>Share Link</div>
        </ModalWrapper>
      );
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