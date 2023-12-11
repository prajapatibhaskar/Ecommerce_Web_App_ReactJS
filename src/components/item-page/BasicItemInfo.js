import React from "react";
import "../../styles/item-page.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "../../styles/card.css";
import "../../styles/common.css";

export const BasicItemInfo = ({ item, optionStates, selectedOptionCombination }) => {

  return (
    <>
      <table className="basic-info-table">
        <tr>
          <th>Name</th>
          <td>
            <b>{item.name}</b>
          </td>
        </tr>
        <tr>
          <th>Brand</th>
          <td>{item.brand}</td>
        </tr>
        <tr>
          <th>Rating</th>
          <td>{getRatingDisplay(item)}</td>
        </tr>
        <tr>
          <th>Price</th>
          {selectedOptionCombination ? (
            <td>
              {selectedOptionCombination?.price?.countryCode === "INR" ? "₹" : ""}
              {selectedOptionCombination?.price?.amount}
            </td>
          ) : (
            <td className="unavailable">UNAVAILABLE</td>
          )}
        </tr>
        <tr>
          <td colSpan={2}>
            <Stack direction="row" spacing={1}>
              {item.categories?.map((category) => (
                <Chip label={category} />
              ))}
            </Stack>
          </td>
        </tr>
      </table>
    </>
  );
};

const getRatingDisplay = (item) => {
  const ratings = [];
  let averageRating;
  let starList = [];

  item.reviews?.forEach((review) => {
    ratings.push(review.rating);
  });

  const sum = ratings.reduce((a, b) => a + b, 0);
  averageRating = ratings.length ? Math.floor(sum / ratings.length) : 0;

  starList = Array(averageRating).fill(
    <i className="fa fa-star rating-included"></i>
  );
  for (let index = 0; index < 5 - averageRating; index++) {
    starList.push(<i className="fa fa-star rating-excluded"></i>);
  }

  return starList.map((star) => star);
};
