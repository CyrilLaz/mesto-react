import React from 'react';
import PopupWithForm from './PopupWithForm';

export function EditAvatarPopup(props) {
  const input = React.useRef();

  const popupProps = {
    name: 'changeAvatar',
    title: 'Обновить аватар',
    isOpen: props.isOpen,
    children: (
      <>
        <input
          ref={input}
          defaultValue=""
          name="avatarUrl"
          type="url"
          placeholder="Ссылкак на фотографию профиля"
          className="form__input form__input_type_url"
          required
        />
        <span className="form__input-error avatarUrl-error"></span>
      </>
    ),
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: input.current.value,
    });
    e.target.reset();
  
  }

  return <PopupWithForm {...popupProps} {...props} onSubmit={handleSubmit} />;
}
