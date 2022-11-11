function PopupWithForm(props) {
  console.log('попап тут');
  return (
    <div className={`popup popup-${props.name}${props.isOpen?' popup_opened':''}`}>
      <div className="popup__container">
        <form className="form" name="popupAvatar" noValidate>
          <h2 className="form__title">{props.title}</h2>
          <fieldset className="form__input-container">
            {props.children}
          </fieldset>
          <button type="submit" className="form__button">
            Сохранить
          </button>
        </form>
        <button onClick={props.onClose} type="button" className="popup__button-close"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
/*        <div className="popup popup-profile">
          <div className="popup__container">
            <form className="form" name="popupForm" noValidate>
              <h2 className="form__title">Редактировать профиль</h2>
              <fieldset className="form__input-container">
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
              </fieldset>
              <button type="submit" className="form__button">
                Сохранить
              </button>
            </form>
            <button type="button" className="popup__button-close"></button>
          </div>
        </div>

        <div className="popup popup-addPicture">
          <div className="popup__container">
            <form className="form" name="popupForm" noValidate>
              <h2 className="form__title">Новое место</h2>
              <fieldset className="form__input-container">
                <input
                  name="pictureName"
                  type="text"
                  placeholder="Название"
                  className="form__input form__input_type_title"
                  minLength="3"
                  required
                />
                <span className="form__input-error pictureName-error">
                  ошибка
                </span>
                <input
                  name="pictureUrl"
                  type="url"
                  placeholder="Ссылкак на картинку"
                  className="form__input form__input_type_url"
                  required
                />
                <span className="form__input-error pictureUrl-error"></span>
              </fieldset>
              <button type="submit" className="form__button">
                Создать
              </button>
            </form>
            <button type="button" className="popup__button-close"></button>
          </div>
        </div>



        <div className="popup popup-changeAvatar">
          <div className="popup__container">
            <form className="form" name="popupAvatar" noValidate>
              <h2 className="form__title">Обновить аватар</h2>
              <fieldset className="form__input-container">
                <input
                  name="avatarUrl"
                  type="url"
                  placeholder="Ссылкак на фотографию профиля"
                  className="form__input form__input_type_url"
                  required
                />
                <span className="form__input-error avatarUrl-error"></span>
              </fieldset>
              <button type="submit" className="form__button">
                Сохранить
              </button>
            </form>
            <button type="button" className="popup__button-close"></button>
          </div>
        </div> 
        
                <div className="popup popup-confirmation">
          <div className="popup__container">
            <form className="form">
              <h2 className="form__title form__title_type_confirm">
                Вы уверены?
              </h2>
              <input
                hidden
                name="cardId"
                className="form__input"
                value=""
                type="text"
              />
              <button type="submit" className="form__button">
                Да
              </button>
            </form>
            <button type="button" className="popup__button-close"></button>
          </div>
        </div>
        */
