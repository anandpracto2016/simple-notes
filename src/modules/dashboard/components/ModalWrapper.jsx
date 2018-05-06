import React from 'react';
import Modal from 'react-modal';

//React Modal Settings
const ModalWrapper = (props) => {
  const position = props.position || 'center';
  return (
    <Modal isOpen={true}
      className={
        {
          base: `c-modal--${position}__Content`,
          afterOpen: `c-modal--${position}__Content--after-open`
        }
      }
      overlayClassName={
        {
          base: `c-modal--${position}__Overlay`,
          afterOpen: `c-modal--${position}__Overlay--after-open`
        }
      }
      onRequestClose={props.onClose} contentLabel="Header">
      {props.children}
    </Modal>
  )
}

export default ModalWrapper;
