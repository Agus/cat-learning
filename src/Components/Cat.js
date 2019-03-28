import React from 'react';
import './Cat.css';

export const Cat = props => (
  <div className="Cat">
    <img
      className="CatPicture"
      onClick={props.onClick}
      src={require(`../Images/${props.catImage}`)}
      alt="Logo"
    />
  </div>
);
