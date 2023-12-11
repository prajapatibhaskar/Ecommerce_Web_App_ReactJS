import * as React from "react";
import Rating from "@mui/material/Rating";

export default function FilterRating({ ratings, setRatings, rating , setFilters, filters}) {
  return (
    <>
      <div
        className={`rating-filter ${rating.isSelected ? "rating-selected" : ""}`}
        onClick={() => onRatingClick(ratings, setRatings, rating, setFilters, filters)}
      >
        <Rating
          name="size-medium"
          defaultValue={rating.defaultValue}
          readOnly
        />
      </div>
    </>
  );
}

const onRatingClick = (ratings, setRatings, myRating, setFilters, filters) => {

    const ratingsClone = JSON.parse(JSON.stringify(ratings));
    const filtersClone = JSON.parse(JSON.stringify(filters));

    ratingsClone.forEach(rating => {
        if(rating.defaultValue === myRating.defaultValue){
            rating.isSelected = !rating.isSelected;
            if(rating.isSelected){
                filtersClone.minimumRating = myRating.defaultValue;
            } else{
                delete filtersClone.minimumRating;
            }
        } else{
            rating.isSelected = false;
        }
    });
    setRatings(ratingsClone);
    setFilters(filtersClone);
};