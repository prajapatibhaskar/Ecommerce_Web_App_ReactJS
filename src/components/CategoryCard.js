import React, { useEffect, useState } from "react";
import "../styles/category.css";
import { json } from "react-router-dom";

export const CategoryCard = ({
  categoryKey,
  name,
  filters,
  setFilters,
  isSelected,
  categories,
  setCategories,
}) => {
  return (
    <div
      className={`category-card ${isSelected ? "category-card-selected" : ""}`}
      onClick={() =>
        toggleCategoryclick(
          filters,
          setFilters,
          categoryKey,
          isSelected,
          categories,
          setCategories
        )
      }
    >
      {name}
    </div>
  );
};

const toggleCategoryclick = (
  filters,
  setFilters,
  categoryKey,
  isSelected,
  categories,
  setCategories
) => {
    const categoriesClone = JSON.parse(JSON.stringify(categories));
    const filtersClone = JSON.parse(JSON.stringify(filters));
    categoriesClone.forEach(category => {
        if(category.key === categoryKey) {
            category.isSelected = !category.isSelected;
            filtersClone.category = category.isSelected ? categoryKey : null;
        } else {
            category.isSelected = false;
        }
    });
    setCategories(categoriesClone);
    setFilters(filtersClone);
};
