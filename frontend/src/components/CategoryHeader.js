import React, { useState } from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

Modal.setAppElement('#root');

const CategoryHeader = (props) => {
  const modalStyle = {
    overlay: { zIndex: 1000 },
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="category-header">
        <div
          className="category-back"
          onClick={() => {
            props.history.push(props.backRoute);
          }}
        >
          <i className="fas fa-angle-double-left"></i>
        </div>
        <h1 className="category-title">{props.title}</h1>
        <div className="category-add" onClick={openModal}>
          <i className={props.icon}></i>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        className="Modal"
      >
        {React.cloneElement(props.form, { close: closeModal })}
      </Modal>
    </div>
  );
};

export default withRouter(CategoryHeader);
