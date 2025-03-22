"use client";
import React, { useState } from "react";
import Item from "./item"; // Import the Item component

function ItemList({ items }) { // Receive items as a prop
  const [sortBy, setSortBy] = useState("name"); // Sorting state

  // Create a sorted copy of the items array
  const getSortedItems = () => {
    let sortedItems = [...items]; // Make a copy to prevent mutation

    if (sortBy === "name") {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      sortedItems.sort((a, b) => a.category.localeCompare(b.category));
    }

    return sortedItems;
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {/* Sorting Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["name", "category"].map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            style={{
              padding: "10px 15px",
              backgroundColor: sortBy === option ? "#075f6e" : "#2A9D8F",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {option === "name" ? "Sort by Name" : "Sort by Category"}
          </button>
        ))}
      </div>

      {/* Render Items */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {getSortedItems().map((item, index) => (
          <Item
            key={item.id ?? index}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
