'use client';

import React, { useState } from "react";

export default function GroceryForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);

  // Functions to update quantity
  const increment = () => setQuantity((prev) => Math.min(prev + 1, 20));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = { name, category, quantity };
    console.log(item);
    alert(`Item: ${name}\nCategory: ${category}\nQuantity: ${quantity}`);
    setName("");
    setCategory("produce");
    setQuantity(1);
  };

  return (
  
      <form onSubmit={handleSubmit} className="p-2 m-4 bg-slate-900 text-black max-w-sm w-full">
        <div className="mb-2">
         
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          />
        </div>

        <div className="flex justify-between">
          <div className="p-2 mt-1 rounded-md bg-white text-white w-36">
         
        
        <div className="flex justify-between items-center">
          <span className="text-black">{quantity}</span>
          <div className="flex">
            <button
              onClick={decrement}
              disabled={quantity === 1}
              type="button"
              className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
            >
              -
            </button>
            <button
              onClick={increment}
              disabled={quantity === 20}
              type="button"
              className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ml-1"
            >
              +
            </button>
          </div>
        </div>
      </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          >
            <option value disabled>Category</option>
            <option value="produce" selected>Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen">Frozen Foods</option>
            <option value="canned">Canned Goods</option>
            <option value="dry">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        

        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          
        >
          +
        </button>
      </form>
    
  );
}
