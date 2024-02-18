// Popup component
import React, { useState } from "react";

const AddPopup = ({ userEmail, onClose, onSubmit }: { userEmail: string; onClose: () => void; onSubmit: (data: { email: string; topic: string }) => void }) => {
  const [topicName, setTopicName] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit({ email: userEmail, topic: topicName });
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Topic Name:
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="text-black"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
