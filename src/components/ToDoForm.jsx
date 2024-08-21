import React, { useState } from 'react'; // Import React and the useState hook for managing state
import InputField from './InputField'; // Import the InputField component
import RenderInput from './RenderInput'; // Import the RenderInput component

export default function ToDoForm() {
  // Declare a state variable 'items' to store the list of to-do items, and 'setItems' to update this state
  const [items, setItems] = useState([]); 
  // Declare a state variable 'itemName' to store the current input, and 'setItemName' to update it
  const [itemName, setItemName] = useState(''); 
  // Declare a state variable 'showItem' to control the visibility of the input field, and 'setShowItem' to update it
  const [showItem, setShowItem] = useState(false); 
  const [edittingIndex, setEdittingIndex] =useState(null);

  // Function to add a new item to the 'items' array
  const addItem = (item) => {
    // Add the new item to the 'items' array, with 'isCompleted' initially set to false
    setItems([...items, { name: item, isCompleted: false }]);
    // Hide the input form after adding an item
    setShowItem(false);  
  };

  // Function to toggle the 'isCompleted' status of an item
  const toggleComplete = (index) => {
    const newItems = [...items]; // Copy the 'items' array
    newItems[index].isCompleted = !newItems[index].isCompleted; // Toggle the 'isCompleted' status of the specified item
    setItems(newItems); // Update the 'items' state with the modified array
  };

  // Function to delete an item from the list
  const deleteItem = (index) => {
    const newItems = [...items]; // Create a copy of the items array
    newItems.splice(index, 1); // Remove the item at the specified index
    setItems(newItems); // Update the 'items' state with the modified array
  };
  // Function to handle editing an item
  const handleEdit = (index,setEditValue,value) => {
    if(!items[index].isCompleted){
    setEdittingIndex(index); 
    setEditValue(value)
    }// Set the editing index to the index of the item being edited
  };

  // Function to save the edited item
  const saveEdit = (index, newName) => {
    const newItems = [...items];
    newItems[index].name = newName; // Update the item's name with the new value
    setItems(newItems);
    setEdittingIndex(null); // Reset the editing index after saving
  };

  return (
    <div className='container container-Form'>
      <h1>To Do List</h1> 
      <div className='To-do-list'>
        {items.length === 0 ? (
          <h2>(No items)</h2>
        ) : (
          items.map((item, index) => (
            // Render the RenderInput component for each item in the list
            <RenderInput
              key={index} // Unique key for each item
              item={item} // Pass the item object as a prop
              index={index} // Pass the index as a prop
              toggleComplete={toggleComplete} // Pass the toggleComplete function as a prop
              deleteItem={deleteItem} // Pass the deleteItem function as a prop
              handleEdit={handleEdit}
              editing={edittingIndex === index}
              saveEdit={saveEdit}
            />
          ))
        )}
        {/* Render the InputField component and pass necessary props */}
        <InputField
          onAddItem={addItem} // Function to add a new item
          itemName={itemName} // Current item input
          setItemName={setItemName} // Function to update the item input
          showItem={showItem} // State to show/hide the input field
          setShowItem={setShowItem} // Function to toggle the input field visibility
        />
      </div>
    </div>
  );
}
