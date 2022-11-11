function ImagePopup() {
  return (
    <div className="popup popup-picture">
      <div className="popup-picture__container">
        <img className="popup-picture__picture" alt="изображение" src="#" />
        <h2 className="popup-picture__title"></h2>
        <button className="popup__button-close close-picture"></button>
      </div>
    </div>
  );
}
export default ImagePopup;
