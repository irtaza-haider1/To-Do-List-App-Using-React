import React, { useState } from 'react';

export default function RenderInput({ item, index, toggleComplete, deleteItem, handleEdit, editing, saveEdit }) {
  const [editValue, setEditValue] = useState(''); // State to track the new value while editing


  // Function to handle submitting the edit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    saveEdit(index, editValue); // Save the new value when the user submits the edit
  };

  return (
    <div className={`item ${item.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={() => toggleComplete(index)}
      />
      {/* Conditionally render the input field if the item is being edited */}
      {editing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)} // Update the edit value when the input changes
            onBlur={() => saveEdit(index, editValue)} // Save the edit when the input loses focus
            autoFocus // Automatically focus the input field when editing starts
          />
        </form>
      ) : (
        // If not editing, show the item text
        <span
          className={item.isCompleted ? 'line-through' : ''}
          onClick={() => handleEdit(index,setEditValue,item?.name)} // Trigger edit mode when clicking on the text
        >
          {item.name}
        </span>
      )}
      <button className='delete-item' onClick={() => deleteItem(index)}>Delete</button>
    </div>
  );
}
