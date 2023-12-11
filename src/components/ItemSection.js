import { Card } from "./Card";
import React, { useEffect, useState } from "react";
import "../styles/card.css";

export const ItemSection = ({ filters, setItemSelected }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems(filters, setItems);
  }, []);

  useEffect(() => {
    setItems([]);
    fetchItems(filters, setItems);
  }, [filters]);

  return (
    <div className="item-section">
      {items.map((item) => (
        <Card
          itemId={item.id}
          name={item.name}
          rating={item.averageRating}
          prices={item.prices}
          setItemSelected={setItemSelected}
          combinationIds={item.combinationIds}
        />
      ))}
    </div>
  );
};

const fetchItems = (filters, setItems) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters || {}),
  };

  fetch("http://localhost:8080/items", requestOptions)
    .then((response) => response.json())
    .then((response) => setItems(response));
};
