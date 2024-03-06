import React, { useEffect, useState } from "react";
import FlashcardModal from "./FlashcardModal";

const FlashcardSetsTable = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);

  useEffect(() => {
    // Fetch data from API endpoint
    fetch("http://localhost:8000/flashcards")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Set the fetched data to the state
        setFlashcardSets(data.flashcards);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to fetch data only once

  // Function to handle row click event
  const handleRowClick = (set) => {
    setSelectedSet(set);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedSet(null);
  };

  return (
    <div className="table-container">
      <h2>Flashcard Sets</h2>
      <div className="outer-container">
        <table className="flashcard-sets-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Flashcards</th>
            </tr>
          </thead>
          <tbody>
            {flashcardSets.map((set) => (
              <tr key={set.flashcard_id} onClick={() => handleRowClick(set)}>
                <td>{set.topic}</td>
                <td>{set.flashcards.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSet && (
        <FlashcardModal
          flashcards={selectedSet.flashcards}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FlashcardSetsTable;
