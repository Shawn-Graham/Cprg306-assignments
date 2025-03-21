"use client";
import React, { useState } from 'react';
import ItemList from '../week-10/item-list';
import NewItem from '../week-10/new-item';
import itemsData from '../week-10/items.json';
import MealIdeas from '../week-10/meal-ideas';

const Page = () => {
  // Initialize the state variable with data from items.json
  const [items, setItems] = useState(itemsData);
  const [selectedItem, setSelectedItem] = useState(null);

  // Event handler function to add a new item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Event handler to clean item name and set selectedItem
  const handleItemSelect = (item) => {
    const cleanItemName = (name) => {
      // Remove everything after a comma
      let cleaned = name.split(",")[0];

      // Remove all emojis and special characters
      cleaned = cleaned.replace(/[^\w\s]/gi, "").trim();

      // Convert plural words to singular (basic rule: remove ending 's')
      cleaned = cleaned.replace(/\b(\w+)s\b/, "$1");

      // Ensure only letters and spaces remain
      cleaned = cleaned.match(/[A-Za-z]+/g)?.join(" ") || "";

      return cleaned;
    };

    // Call the function and update the state
    setSelectedItem(cleanItemName(item.name));
  };

  return (
    <main className="bg-slate-950">
       <h2 className="text-3xl font-bold mb-4">Shopping List</h2>
      <div className="flex">
      <div className="flex-1 max-w-sm m-2">
        <div>
          <NewItem onAddItem={handleAddItem} />
        </div>
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <div className="flex-1 max-w-sm m-2">
        <MealIdeas ingredient={selectedItem} />
      </div>
      </div>
    </main>
  );
};

export default Page;
