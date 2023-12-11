import * as React from "react";
import { ItemSection } from "./ItemSection";
import "../styles/shop.css";
import { FilterSection } from "./FilterSection";
import { CategoryCard } from "./CategoryCard";
import "../styles/category.css";
import { useState, useEffect } from "react";
import { ItemPage } from "./ItemPage";

export const Shop = ({}) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((response) => {
        response.forEach((category) => {
          category.isSelected = false;
        });
        return response;
      })
      .then((response) => setCategories(response));
  }, []);

  return (
    <>
      <div className="shop">
        <>
          <div className="category-section">
            {categories.map((category) => (
              <CategoryCard
                categoryKey={category.key}
                name={category.name}
                setFilters={setFilters}
                filters={filters}
                isSelected={category.isSelected}
                categories={categories}
                setCategories={setCategories}
              />
            ))}
          </div>
          <div className="shop-section-2">
            <div className="filter-section-container">
              <FilterSection filters={filters} setFilters={setFilters} />
            </div>
            <div className="item-section-container">
              <ItemSection
                filters={filters}
                setItemSelected={setItemSelected}
              />
            </div>
          </div>
        </>
      </div>
    </>
  );
};
