import React from "react";
import { Link } from "react-router-dom";
import "../styles/Item.css";

const ItemComponent = ({ itemID, title, description, price, image, rating }) => {
  return (
    <div className="card">
      <Link to={`/item/${itemID}`}>
        <img src={image} className="card__image" alt="card"></img>
      </Link>
      <Link to={`/item/${itemID}`} className="card__body">
        <a className="card__title">{title}</a>
        {/* <p className="card__description">{description}</p> */}
        <h3 className="card__price">${price}</h3>
        <button className="card__btn">View More</button>
      </Link>
    </div>
  );
};

export default ItemComponent;
