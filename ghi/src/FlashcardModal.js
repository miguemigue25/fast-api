import React, { useState } from "react";
import "./FlashCardSetTable.css";

const FlashcardModal = ({ flashcards, onClose }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (!flashcards || flashcards.length === 0) {
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

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h2>{flashcards[currentCardIndex].topic} Flashcards</h2>
          <div className="flashcard">
            <div className="flashcard-question">
              <h3>Question:</h3>
              <p>{flashcards[currentCardIndex].question}</p>
            </div>
            <div
              className="flashcard-answer"
              style={{ display: showAnswer ? "block" : "none" }}
            >
              <h3>Answer:</h3>
              <p>{flashcards[currentCardIndex].answer}</p>
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
