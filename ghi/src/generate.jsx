import React from "react";
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
  const [isAnswerShown, setIsAnswerShown] = React.useState(false);

  const toggleAnswer = () => {
    console.log("Toggling answer");
    setIsAnswerShown(!isAnswerShown);
    console.log("isAnswerShown:", isAnswerShown);
  };

  React.useEffect(() => {
    console.log("isAnswerShown:", isAnswerShown);
  }, [isAnswerShown]);

  return (
    <div className="flashcard" onClick={toggleAnswer}>
      <div className="question">{question}</div>
      {isAnswerShown && <div className="answer">{answer}</div>}
    </div>
  );
};

const FlashcardList = () => {
  return (
    <div className="flashcard-container">
      {flashcardsData.map((flashcard, index) => (
        <Flashcard
          key={index}
          question={flashcard.question}
          answer={flashcard.answer}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
