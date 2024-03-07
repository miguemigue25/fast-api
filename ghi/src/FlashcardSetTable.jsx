import React, { useState, useEffect } from "react";
import FlashcardModal from "./FlashcardModal";

const FlashcardSetsTable = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedFlashcardId, setSelectedFlashcardId] = useState(null);
  const [selectedFlashcardTopic, setSelectedFlashcardTopic] = useState(null);

  useEffect(() => {
    // Fetch data from API endpoint
    fetch("http://localhost:8000/flashcards")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched flashcard sets:", data);
        // Set the fetched data to the state
        setFlashcardSets(data.flashcards);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to fetch data only once

  // Function to handle row click event
  const handleRowClick = (flashcardId, topic) => {
    setSelectedFlashcardId(flashcardId);
    setSelectedFlashcardTopic(topic);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedFlashcardId(null);
    setSelectedFlashcardTopic(null);
  };

  return (
    <div className="table-container">
      <h2>Flashcard Sets</h2>
      <div className="outer-container">
        <table className="flashcard-sets-table topic-header">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {flashcardSets.map((set) => (
              <tr
                key={set.flashcard_id}
                onClick={() => handleRowClick(set.flashcard_id, set.topic)}
              >
                <td>{set.topic}</td>
                <td>{set.flashcards.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedFlashcardId && (
        <FlashcardModal
          flashcardId={selectedFlashcardId}
          onClose={closeModal}
          topic={selectedFlashcardTopic}
        />
      )}
    </div>
  );
};

export default FlashcardSetsTable;
