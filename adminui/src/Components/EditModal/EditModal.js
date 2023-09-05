import React, { useState } from "react";
import "./EditModal.css";

export default function EditModal({ item, onSave, onClose }) {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>Edit Data</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={editedItem.email}
          onChange={handleInputChange}
        />
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={editedItem.role}
          onChange={handleInputChange}
        />

        <div className="modal-btn">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
