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
import FormValidator from '../utils/FormValidator';
import { validationConfig } from '../utils/validation-config';
import { ConfirmDeletionPopup } from './ConfirmationDeletePopup';

function App() {

  const [selectedCard, setSelectedCard] = React.useState({});
  const [popupButton, setPopupButton] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [
    {
      isEditProfilePopupOpen,
      isEditAvatarPopupOpen,
      isAddPlacePopupOpen,
      isConfirmDeletionPopupOpen,
      popupProps,
      clearInputErrors,
    },
    setPopupOpen,
  ] = React.useState({});

  // получаем информацию для загрузки
  React.useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  // активируем валидацию и определяем методы
  React.useEffect(() => {
    const validFormProfile = new FormValidator(
      validationConfig,
      document.forms.profile
    );
    const validFormCard = new FormValidator(
      validationConfig,
      document.forms.changeAvatar
    );
    const validFormAvatar = new FormValidator(
      validationConfig,
      document.forms.addPicture
    );

    setPopupButton({
      makeAvatarButtonDisabled: validFormAvatar.makeButtonDisabled,
      makeProfileButtonDisabled: validFormProfile.makeButtonDisabled,
      makeCardButtonDisabled: validFormCard.makeButtonDisabled,
      makeConfirmButtonDisabled: new FormValidator(
        validationConfig,
        document.forms.confirmDelete
      ).makeButtonDisabled,
    });

    setPopupOpen({
      clearInputErrors: function () {
        validFormProfile.clearInputErrors();
        validFormCard.clearInputErrors();
        validFormAvatar.clearInputErrors();
      },
    });

    validFormProfile.enableValidation();
    validFormCard.enableValidation();
    validFormAvatar.enableValidation();
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
    popupButton.makeConfirmButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранение...' });
    Api.removeCard(card._id).then((mes) => {
      setPopupButton({ ...popupButton, buttonText: 'Готово' });
      closeAllPopups();
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleEditAvatarClick() {
    popupButton.makeAvatarButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранить' });
    setPopupOpen({ clearInputErrors, isEditAvatarPopupOpen: true });
  }

  function handleEditProfileClick() {
    popupButton.makeProfileButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранить' });
    setPopupOpen({ clearInputErrors, isEditProfilePopupOpen: true });
  }

  function handleAddPlaceClick() {
    popupButton.makeCardButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранить' });
    setPopupOpen({ clearInputErrors, isAddPlacePopupOpen: true });
  }

  function closeAllPopups() {
    setPopupOpen({ clearInputErrors });
    setSelectedCard({ ...selectedCard, isOpen: false });

    clearInputErrors();
  }

  function handleUpdateUser(props) {
    popupButton.makeProfileButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранение...' });
    Api.changeUserInfo(props).then((res) => {
      setPopupButton({ ...popupButton, buttonText: 'Готово' });
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(props) {
    popupButton.makeAvatarButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранение...' });
    Api.changeAvatar(props.avatar).then((res) => {
      setPopupButton({ ...popupButton, buttonText: 'Готово' });
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleAddPlace(props) {
    popupButton.makeCardButtonDisabled(true);
    setPopupButton({ ...popupButton, buttonText: 'Сохранение...' });
    Api.addNewCard(props).then((newCard) => {
      setPopupButton({ ...popupButton, buttonText: 'Готово' });
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleConfirmationDelete(props) {
    popupButton.makeConfirmButtonDisabled(false);
    setPopupButton({ ...popupButton, buttonText: 'Да' });
    setPopupOpen({
      clearInputErrors,
      isConfirmDeletionPopupOpen: true,
      popupProps: props,
    });
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
                handleConfirmationDelete,
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
          <ConfirmDeletionPopup
            {...popupProps}
            isOpen={isConfirmDeletionPopupOpen}
            onClose={closeAllPopups}
            {...popupButton}
            onConfirmDeletion={handleCardDelete}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
