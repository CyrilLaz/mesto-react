import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Card from './Card';
import React from 'react';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';

function App() {
  const [selectedCard, setSelectedCard] = React.useState({});
  const [popupButton, setPopupButton] = React.useState({
    buttonText: 'Сохранить',
  });

  const [
    { isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen },
    setPopupOpen,
  ] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardClick(props) {
    setSelectedCard({ ...props, isOpen: true });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    Api.removeCard(card._id).then((mes) => {
      console.log(mes);
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleEditAvatarClick() {
    setPopupOpen({ isEditAvatarPopupOpen: true });
  }

  function handleEditProfileClick() {
    setPopupOpen({ isEditProfilePopupOpen: true });
  }

  function handleAddPlaceClick() {
    setPopupOpen({ isAddPlacePopupOpen: true });
  }

  function closeAllPopups() {
    setPopupOpen({});
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleUpdateUser(props) {
    setPopupButton({ buttonText: 'Сохранение...' });
    Api.changeUserInfo(props)
      .then((res) => {
        setPopupButton({ buttonText: 'Готово' });
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() =>
        setTimeout(() => setPopupButton({ buttonText: 'Сохранить' }), 500)
      );
  }

  function handleUpdateAvatar(props) {
    setPopupButton({ buttonText: 'Сохранение...' });
    Api.changeAvatar(props.avatar)
      .then((res) => {
        setPopupButton({ buttonText: 'Готово' });
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() =>
        setTimeout(() => setPopupButton({ buttonText: 'Сохранить' }), 500)
      );
  }

  function handleAddPlace(props) {
    setPopupButton({ buttonText: 'Сохранение...' });
    Api.addNewCard(props)
      .then((newCard) => {
        setPopupButton({ buttonText: 'Готово' });
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .finally(() =>
        setTimeout(() => setPopupButton({ buttonText: 'Сохранить' }), 500)
      );
  }

  return (
    <div className="App">
      <div className="App__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            cards={cards.map((card) => {
              return Card({
                ...card,
                isOwn: card.owner._id === currentUser._id,
                isLiked: card.likes.some((i) => i._id === currentUser._id),
                handleCardClick,
                handleCardLike,
                handleCardDelete,
              });
            })}
          />
          <Footer />
          <ImagePopup {...selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            {...popupButton}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            {...popupButton}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            {...popupButton}
            onAddPlace={handleAddPlace}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
