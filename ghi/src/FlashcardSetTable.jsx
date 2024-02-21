import React from "react";
import "./FlashCardSetTable.css"; // Import CSS file for table styling

const FlashcardSetsTable = ({ flashcardSets }) => {
  return (
    <div className="table-container">
      <h2>Flashcard Sets</h2>
      <div className="outer-container">
        {" "}
        {/* Add outer container */}
        <table className="flashcard-sets-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Flashcard</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlashcardSetsTable;
