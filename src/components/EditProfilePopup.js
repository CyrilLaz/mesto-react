import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen,currentUser]);
  
  function handleNameChange(e) {
    setName(e.target.value);
  }
  
  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  const popupProps = {
    name: 'profile',
    title: 'Редактировать профиль',
    isOpen: props.isOpen,
    children: (
      <>
        <input
          onChange={handleNameChange}
          value={name||''}
          name="userName"
          type="text"
          placeholder="Ваше имя"
          className="form__input form__input_type_name"
          minLength="3"
          required
        />
        <span className="form__input-error userName-error">ошибка</span>
        <input
          onChange={handleAboutChange}
          value={description||''}
          name="userJob"
          type="text"
          placeholder="Чем занимаетесь"
          className="form__input form__input_type_job"
          minLength="5"
          required
        />
        <span className="form__input-error userJob-error">ошибка</span>
      </>
    ),
  };
  
  return <PopupWithForm {...popupProps} {...props} onSubmit={handleSubmit} />;
}
