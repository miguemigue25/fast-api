import React, { useState } from "react";
import "./generate.css";

const flashcardsData = [
  { question: "What is the capital of France?", answer: "Paris" },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
  { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
];

const Flashcard = ({ question, answer }) => {
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const toggleAnswer = () => {
    setIsAnswerShown(!isAnswerShown);
  };

  return (
    <div className="flashcard" onClick={toggleAnswer}>
      <div className="question">{question}</div>
      {isAnswerShown && <div className="answer">{answer}</div>}
    </div>
  );
};

const FlashcardList = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [newSubject, setNewSubject] = useState("");

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === flashcardsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
  };

  const handleSubjectSubmit = () => {
    console.log("new subject", newSubject);
    setNewSubject("");
  };

  return (
    <div className="flashcard-container subject-input">
      <input
        type="text"
        placeholder="Enter new subject"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
      />
      <div>
        <button
          className="create-subject-button"
          onClick={handleSubjectSubmit}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "solid 1px",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff6600";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
          }}
        >
          Create Subject
        </button>
      </div>
      <Flashcard
        question={flashcardsData[currentCardIndex].question}
        answer={flashcardsData[currentCardIndex].answer}
      />
      <div className="navigation-buttons">
        <div className="">
          <button
            onClick={goToNextCard}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid",
              borderRadius: "5px",
              padding: "20px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#ff6600";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "whitesmoke";
            }}
          >
            Back
          </button>
          <button
            onClick={goToPrevCard}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid",
              borderRadius: "5px",
              padding: "20px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#ff6600";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "whitesmoke";
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardList;
