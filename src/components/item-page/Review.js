import React from "react";
import Avatar from "@mui/material/Avatar";

export const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="review-user">
        <div className="review-user-avatar">
        <Avatar src="/broken-image.jpg" />
        </div>
        <div className="review-user-name">
            Anonymous <span className="user-star-rating">{getStars(review.rating)}</span>
        </div>
      </div>
      <div className="review-comment">{review.comment}</div>
    </div>
  );
};

const getStars = (rating) => {
    let starList = [];
  
    starList = Array(Math.floor(rating)).fill(
      <i className="fa fa-star rating-included"></i>
    );
    for (let index = 0; index < 5 - Math.floor(rating); index++) {
      starList.push(<i className="fa fa-star rating-excluded"></i>);
    }
  
    return starList.map((star) => star);
  };
  