//import logo from './images/logo.svg';
//import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';

// let isEditProfilePopupOpen = false,
//   isAddPlacePopupOpen = false,
//   isEditAvatarPopupOpen = false;

function App() {
  const isEditAvatarPopupOpen = {
    name: 'changeAvatar',
    title: 'Обновить аватар',
    isOpen: true,
    children: (
      <>
        <input
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

  const isEditProfilePopupOpen = {
    name: 'profile',
    title: 'Редактировать профиль',
    isOpen: true,
    children: (
      <>
        <input
          name="userName"
          type="text"
          placeholder="Ваше имя"
          className="form__input form__input_type_name"
          minLength="3"
          required
        />
        <span className="form__input-error userName-error">ошибка</span>
        <input
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

  const isAddPlacePopupOpen = {
    name: 'addPicture',
    title: 'Новое место',
    isOpen: true,
    children: (
      <>
        <input
          name="pictureName"
          type="text"
          placeholder="Название"
          className="form__input form__input_type_title"
          minLength="3"
          required
        />
        <span className="form__input-error pictureName-error">ошибка</span>
        <input
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

  const [props, setProps] = React.useState({});

  function handleEditAvatarClick() {
    setProps({ ...props, ...isEditAvatarPopupOpen });
  }

  function handleEditProfileClick() {
    setProps({ ...props, ...isEditProfilePopupOpen });
  }

  function handleAddPlaceClick() {
    setProps({ ...props, ...isAddPlacePopupOpen });
  }

  function closeAllPopups() {
    setProps({ ...props, isOpen: false });
  }
  
  return (
    <div className="App">
      <div className="App__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
        />
        <Footer />
        <PopupWithForm
          name={props.name}
          title={props.title}
          onClose={closeAllPopups}
          isOpen={props.isOpen}
          children={props.children}
        />
        <template id="card-template">
          <li className="card__item">
            <figure className="cards__item">
              <img className="cards__picture" />
              <button className="cards__button-delete"></button>
              <figcaption className="cards__capture">
                <h2 className="cards__title"></h2>
                <div className="cards__like">
                  <button className="cards__like-icon"></button>
                  <span className="cards__like-counter"></span>
                </div>
              </figcaption>
            </figure>
          </li>
        </template>
      </div>
    </div>
  );
}

export default App;
