import React from 'react';
import PopupWithForm from './PopupWithForm';

export function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  React.useEffect(() => {
    setTitle('');
    setUrl('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name:title,link:url})
  }
  const popupProps = {
    name: 'addPicture',
    title: 'Новое место',
    isOpen: props.isOpen,
    children: (
      <>
        <input
          onChange={handleTitleChange}
          value={title || ''}
          name="pictureName"
          type="text"
          placeholder="Название"
          className="form__input form__input_type_title"
          minLength="3"
          required
        />
        <span className="form__input-error pictureName-error">ошибка</span>
        <input
          onChange={handleUrlChange}
          value={url || ''}
          name="pictureUrl"
          type="url"
          placeholder="Ссылкак на картинку"
          className="form__input form__input_type_url"
          required
        />
        <span className="form__input-error pictureUrl-error"></span>
      </>
    ),
  };

  return <PopupWithForm {...popupProps} {...props} onSubmit={handleSubmit}/>;
}
