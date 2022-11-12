//import logo from './images/logo.svg';
//import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import Api from '../utils/Api';
import Card from './Card';
import ImagePopup from './ImagePopup';

function App() {
  const [selectedCard, setSelectedCard] = React.useState({});
  const [popupProps, setPopupProps] = React.useState({});
  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setUserInfo(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

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

  function handleCardClick(props) {
    setSelectedCard({ ...props, isOpen: true });
  }

  function handleEditAvatarClick() {
    console.log('клик по аватару');
    setPopupProps({ ...popupProps, ...isEditAvatarPopupOpen });
  }

  function handleEditProfileClick() {
    setPopupProps({ ...popupProps, ...isEditProfilePopupOpen });
  }

  function handleAddPlaceClick() {
    setPopupProps({ ...popupProps, ...isAddPlacePopupOpen });
  }

  function closeAllPopups() {
    setPopupProps({});
    setSelectedCard({});
  }

  return (
    <div className="App">
      <div className="App__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          cards={cards.map((card, index) =>
            Card({ index, ...card, userInfo, handleCardClick })
          )}
          {...userInfo}
        />
        <Footer />
        <PopupWithForm
          name={popupProps.name}
          title={popupProps.title}
          onClose={closeAllPopups}
          isOpen={popupProps.isOpen}
          children={popupProps.children}
        />
        <ImagePopup {...selectedCard} onClose={closeAllPopups} />
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
