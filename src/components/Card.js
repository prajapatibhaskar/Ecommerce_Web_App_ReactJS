import React, { useEffect, useState } from "react";
import "../styles/card.css";
import { useNavigate } from "react-router-dom";

export const Card = ({ itemId, name, rating, prices, setItemSelected, combinationIds }) => {
  const navigate = useNavigate();

  const [byteArray, setByteArray] = useState("");
  const [cardImgSrc, setCardImgSrc] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/item/${itemId}/image`)
    .then(response => response.json())
    .then(response => setByteArray(response[0]))
  }, []);

  useEffect(() => {
    if(byteArray){
      let cardImgSrc_ = "data:image/png;base64," + byteArray;
      console.log(itemId);
      setCardImgSrc(cardImgSrc_);
    }
    else{
      setCardImgSrc(undefined);
    }
  }, [byteArray]);

  return (
    <div
      className="card"
      onClick={() => {
        setItemSelected(itemId);
        navigate(`/item/${itemId}`);
      }}
    >
      <div className="item-image">
        <img className="card-image" src={cardImgSrc} alt="" styles={{ width: "100%" }}></img>
      </div>
      <div className="container">
        <table>
          <tr>
            <td>
              <b>{name}</b>
            </td>
          </tr>
          <tr>
            <td>
              <b>{getStar(rating)}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span>{getPriceDisplayValue(prices)}</span>
            </td>
          </tr>
        </table>
        <br />
      </div>
    </div>
  );
};

const getStar = (rating) => {
  const floorRating = Math.floor(rating);
  const starList = Array(floorRating).fill(
    <i className="fa fa-star rating-included"></i>
  );
  for (let index = 0; index < 5 - floorRating; index++) {
    starList.push(<i className="fa fa-star rating-excluded"></i>);
  }

  return starList.map((star) => star);
};

const getPriceDisplayValue = (prices) => {
  const currencySymbol = prices[0].countryCode === "INR" ? "₹" : "";

  if (prices.length > 1) {
    let minPrice = null;
    let maxPrice = null;
    prices.forEach((price) => {
      if (minPrice === null) {
        minPrice = price.amount;
      }
      if (maxPrice === null) {
        maxPrice = price.amount;
      }
      if (minPrice > price.amount) {
        minPrice = price.amount;
      }
      if (maxPrice < price.amount) {
        maxPrice = price.amount;
      }
    });
    return (
      <span>
        {currencySymbol}
        {minPrice} - {currencySymbol}
        {maxPrice}
      </span>
    );
  } else {
    return (
      <span>
        {currencySymbol}
        {prices[0].amount}
      </span>
    );
  }
};
