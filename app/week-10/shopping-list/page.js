"use client";
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { addItem, getItems } from '../_services/shopping-list-service';
import ItemList from '../shopping-list/item-list';
import NewItem from '../shopping-list/new-item';
import MealIdeas from '../shopping-list/meal-ideas';
const Page = () => {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load items from Firestore
  const loadItems = async () => {
    try {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Failed to load items", error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      loadItems();
    }
  }, [user]);

  // Handle adding a new item
  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);
      const addedItem = { id: newItemId, ...newItem };
      setItems((prevItems) => [...prevItems, addedItem]);
    } catch (error) {
      console.error("Failed to add item", error);
    }
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
