// import React, { useState, useEffect } from "react";
// import "./FlashCardSetTable.css";

// const FlashcardModal = ({ flashcardId, onClose, topic }) => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);
//   const [showAnswer, setShowAnswer] = useState(false);

//   useEffect(() => {
//     if (!flashcardId) return;

//     // Fetch flashcards by ID
//     fetch(`http://localhost:8000/flashcards/${flashcardId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         setFlashcards(data.flashcards);
//       })
//       .catch((error) => console.error("Error fetching flashcards:", error));
//   }, [flashcardId]);

//   const toggleAnswer = () => {
//     setShowAnswer(!showAnswer);
//   };

//   const handleNextCard = () => {
//     if (currentCardIndex < flashcards.length - 1) {
//       setCurrentCardIndex(currentCardIndex + 1);
//       setShowAnswer(false);
//     }
//   };

//   const handlePrevCard = () => {
//     if (currentCardIndex > 0) {
//       setCurrentCardIndex(currentCardIndex - 1);
//       setShowAnswer(false);
//     }
//   };

//   if (flashcards.length === 0) {
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close" onClick={onClose}>
//             &times;
//           </span>
//           <p>No flashcards available</p>
//         </div>
//       </div>
//     );
//   }

//   const currentFlashcard = flashcards[currentCardIndex];

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <div>
//           <h2>{topic}</h2>
//           <div className="flashcard">
//             <div className="flashcard-question">
//               <h3>Question:</h3>
//               <p>{currentFlashcard.question}</p>
//             </div>
//             <div
//               className="flashcard-answer"
//               style={{ display: showAnswer ? "block" : "none" }}
//             >
//               <h3>Answer:</h3>
//               <p>{currentFlashcard.answer}</p>
//             </div>
//           </div>
//           <div className="navigation-buttons">
//             <button onClick={handlePrevCard} disabled={currentCardIndex === 0}>
//               Previous
//             </button>
//             <button onClick={toggleAnswer}>
//               {showAnswer ? "Hide Answer" : "Show Answer"}
//             </button>
//             <button
//               onClick={handleNextCard}
//               disabled={currentCardIndex === flashcards.length - 1}
//             >
//               Next
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
import useToken from "@galvanize-inc/jwtdown-for-react";

const FlashcardModal = ({ flashcardId, onClose, topic }) => {
  const { token } = useToken();

  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!flashcardId) return;

    const fetchFlashcards = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/flashcards/${flashcardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the obtained token
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards: " + response.status);
        }
        const data = await response.json();
        setFlashcards(data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [flashcardId, token]); // Include token in the dependency array

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
          <h2>{topic}</h2>
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
