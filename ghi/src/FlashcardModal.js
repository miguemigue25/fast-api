// import React, { useState, useEffect } from "react";
// import "./FlashCardSetTable.css";

// const FlashcardModal = ({ flashcardId, onClose }) => {
//   const [flashcard, setFlashcard] = useState(null);
//   const [showAnswer, setShowAnswer] = useState(false);

//   useEffect(() => {
//     if (!flashcardId) return;

//     // Fetch single flashcard by ID
//     fetch(`http://localhost:8000/flashcards/${flashcardId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data); // Log the API response
//         // Assuming you want the first flashcard from the array
//         setFlashcard(data.flashcards[0]);
//       })
//       .catch((error) => console.error("Error fetching flashcard:", error));
//   }, [flashcardId]);

//   const toggleAnswer = () => {
//     setShowAnswer(!showAnswer);
//   };

//   if (!flashcard) {
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close" onClick={onClose}>
//             &times;
//           </span>
//           <p>No flashcard available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <div>
//           <h2>{flashcard.topic} Flashcard</h2>
//           <div className="flashcard">
//             <div className="flashcard-question">
//               <h3>Question:</h3>
//               <p>{flashcard.question}</p>
//             </div>
//             <div
//               className="flashcard-answer"
//               style={{ display: showAnswer ? "block" : "none" }}
//             >
//               <h3>Answer:</h3>
//               <p>{flashcard.answer}</p>
//             </div>
//           </div>
//           <div className="navigation-buttons">
//             <button onClick={toggleAnswer}>
//               {showAnswer ? "Hide Answer" : "Show Answer"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardModal;

import React, { useState, useEffect } from "react";
import "./FlashCardSetTable.css";

const FlashcardModal = ({ flashcardId, onClose }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!flashcardId) return;

    // Fetch flashcards by ID
    fetch(`http://localhost:8000/flashcards/${flashcardId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Log the API response
        setFlashcards(data.flashcards);
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, [flashcardId]);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <p>No flashcards available</p>
        </div>
      </div>
    );
  }

  const currentFlashcard = flashcards[currentCardIndex];

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h2>{currentFlashcard.topic} Flashcards</h2>
          <div className="flashcard">
            <div className="flashcard-question">
              <h3>Question:</h3>
              <p>{currentFlashcard.question}</p>
            </div>
            <div
              className="flashcard-answer"
              style={{ display: showAnswer ? "block" : "none" }}
            >
              <h3>Answer:</h3>
              <p>{currentFlashcard.answer}</p>
            </div>
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrevCard} disabled={currentCardIndex === 0}>
              Previous
            </button>
            <button onClick={toggleAnswer}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button
              onClick={handleNextCard}
              disabled={currentCardIndex === flashcards.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardModal;
