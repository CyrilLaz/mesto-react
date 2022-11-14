function Card(props) {
    return (
      <li key={props._id} className="card__item">
        <figure className="cards__item">
          <img
            className="cards__picture"
            src={props.link}
            alt={`Картинка с названием "${props.name}"`}
            onClick={()=>props.handleCardClick(props)}
          />
          <button className="cards__button-delete"></button>
          <figcaption className="cards__capture">
            <h2 className="cards__title">{props.name}</h2>
            <div className="cards__like">
              <button
                className={`cards__like-icon${
                  props.likes.find((like) => like._id === props.userInfo._id)
                    ? ' cards__like-icon_active'
                    : ''
                }`}
              ></button>
              <span className="cards__like-counter">{props.likes.length}</span>
            </div>
          </figcaption>
        </figure>
      </li>
    );
  }


  export default Card;