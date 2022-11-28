import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  // const currentUser = React.useContext(CurrentUserContext);

  // const isOwn = props.owner._id === currentUser._id;
  // const isLiked = props.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `cards__like-icon${
    props.isLiked ? ' cards__like-icon_active' : ''
  }`;

  const cardDeleteButtonClassName = `cards__button-delete${
    props.isOwn ? ' cards__button-delete_active' : ''
  }`;

  return (
    <li key={props._id} className="card__item">
      <figure className="cards__item">
        <img
          className="cards__picture"
          src={props.link}
          alt={`Картинка с названием "${props.name}"`}
          onClick={() => props.handleCardClick(props)}
        />
        <button className={cardDeleteButtonClassName} onClick={()=>props.handleCardDelete({_id:props._id})}></button>
        <figcaption className="cards__capture">
          <h2 className="cards__title">{props.name}</h2>
          <div className="cards__like">
            <button className={cardLikeButtonClassName} onClick={()=>props.handleCardLike({likes:props.likes,_id:props._id})}></button>
            <span className="cards__like-counter">{props.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
