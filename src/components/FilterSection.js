import React, { useEffect, useState } from "react";
import "../styles/filter.css";
import FilterRating from "./FilterRating";
import Stack from "@mui/material/Stack";

const MAX_RATING = 5;

export const FilterSection = ({ filters, setFilters }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const tempRatings = [];

    for (let index = 5; index >= 0; index--) {
      const ratingObj = {
        defaultValue: index,
        isSelected: false,
      };
      tempRatings.push(ratingObj);
    }
    setRatings(tempRatings);
  }, []);

  return (
    <div className="filter-section">
      <label>Minimum Rating</label>
      <div className="rating-filter-section">
        <Stack spacing={1}>
          {ratings.map((rating) => (
            <FilterRating
              ratings={ratings}
              setRatings={setRatings}
              rating={rating}
              filters={filters}
              setFilters={setFilters}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};
