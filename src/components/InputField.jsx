import React from 'react';

export default function InputField({ onAddItem, itemName, setItemName, showItem, setShowItem }) {
  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (itemName.trim()) { // Check if the input is not empty or only whitespace
      onAddItem(itemName); // Call the addItem function passed as a prop, passing the itemName as an argument
      setItemName('');  // Clear the input field after adding the item
    }
  };

  return (
    <div>
      {/* Button to toggle the visibility of the input field */}
      <button className='add-item' onClick={() => setShowItem(!showItem)}>
        {showItem ? 'Close' : 'Add Item'} {/* Toggle between 'Add Item' and 'Close' based on showItem state */}
      </button>
      {showItem && ( // Conditionally render the input form based on the showItem state
        <div className='item-form'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label> {/* Label for the input field */}
            <input
              type="text"
              id="name"
              value={itemName} // Bind the input field to the itemName state
              onChange={(e) => setItemName(e.target.value)} // Update the itemName state when the input changes
              required // Make this input field required
            />
            <button type="submit">Submit</button> {/* Button to submit the form */}
          </form>
        </div>
      )}
    </div>
  );
}
