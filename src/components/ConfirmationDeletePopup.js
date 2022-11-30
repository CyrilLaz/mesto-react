import React from 'react';
import PopupWithForm from './PopupWithForm';

export function ConfirmDeletionPopup(props) {


  const popupProps = {
    name: 'confirmDelete',
    title: 'Вы уверены?',
    isOpen: props.isOpen,
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirmDeletion({
      ...props
    });
    e.target.reset();
  }


  return <PopupWithForm {...popupProps} {...props} onSubmit={handleSubmit}/>;
}
