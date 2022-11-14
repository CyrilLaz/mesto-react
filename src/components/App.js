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
  const [popupProps, setPopupProps] = React.useState({buttonText: 'Сохранить',});
  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
console.log(popupProps);
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
    setPopupProps({...popupProps, isOpen:false});
    setSelectedCard({...selectedCard, isOpen:false});
  }

  return (
    <div className="App">
      <div className="App__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          cards={cards.map((card) =>
            Card({ ...card, userInfo, handleCardClick })
          )}
          {...userInfo}
        />
        <Footer />
        <PopupWithForm
          onClose={closeAllPopups}
          {...popupProps}
        />
        <ImagePopup {...selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
