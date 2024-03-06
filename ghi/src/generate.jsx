// import React, { useState, useEffect } from "react";
// import "./generate.css";

// const Flashcard = ({ question, answer }) => {
//   const [isAnswerShown, setIsAnswerShown] = useState(false);

//   const toggleAnswer = () => {
//     setIsAnswerShown(!isAnswerShown);
//   };

//   return (
//     <div className="flashcard" onClick={toggleAnswer}>
//       <div className="question">{question}</div>
//       {isAnswerShown && <div className="answer">{answer}</div>}
//     </div>
//   );
// };

// const FlashcardList = () => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);
//   const [newSubject, setNewSubject] = useState("");

//   useEffect(() => {
//     // Fetch flashcards from API when component mounts
//     fetchFlashcards();
//   }, []);

//   const fetchFlashcards = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/generate_flashcards/?topic=${newSubject}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch flashcards");
//       }
//       const data = await response.json();
//       setFlashcards(data.flashcards);
//     } catch (error) {
//       console.error("Error fetching flashcards:", error);
//     }
//   };

//   const goToNextCard = () => {
//     setCurrentCardIndex((prevIndex) =>
//       prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const goToPrevCard = () => {
//     setCurrentCardIndex((prevIndex) =>
//       prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
//     );
//   };

//   const handleSubjectSubmit = async () => {
//     console.log("Sending request with data:", { subject: newSubject });

//     try {
//       const response = await fetch(
//         `http://localhost:8000/generate_flashcards/?topic=${newSubject}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to create flashcards");
//       }
//       const data = await response.json();
//       console.log(data);
//       setFlashcards(data.flashcards);
//       setCurrentCardIndex(0); // Reset to first card
//     } catch (error) {
//       console.error("Error creating flashcards:", error);
//     }
//   };

//   return (
//     <div className="flashcard-container subject-input">
//       <input
//         type="text"
//         placeholder="Enter new subject"
//         value={newSubject}
//         onChange={(e) => setNewSubject(e.target.value)}
//       />
//       <div>
//         <button
//           className="create-subject-button"
//           onClick={handleSubjectSubmit}
//           style={{
//             backgroundColor: "white",
//             color: "black",
//             border: "solid 1px",
//             borderRadius: "5px",
//             padding: "10px 20px",
//             cursor: "pointer",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#ff6600";
//             e.target.style.color = "white";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "white";
//             e.target.style.color = "black";
//           }}
//         >
//           Create Subject
//         </button>
//       </div>
//       {flashcards.length > 0 && (
//         <Flashcard
//           question={flashcards[currentCardIndex].question}
//           answer={flashcards[currentCardIndex].answer}
//         />
//       )}
//       <div className="navigation-buttons">
//         <div className="">
//           <button
//             onClick={goToNextCard}
//             style={{
//               backgroundColor: "white",
//               color: "black",
//               border: "1px solid",
//               borderRadius: "5px",
//               padding: "20px",
//               cursor: "pointer",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#ff6600";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "whitesmoke";
//             }}
//           >
//             Back
//           </button>
//           <button
//             onClick={goToPrevCard}
//             style={{
//               backgroundColor: "white",
//               color: "black",
//               border: "1px solid",
//               borderRadius: "5px",
//               padding: "20px",
//               cursor: "pointer",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#ff6600";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "whitesmoke";
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardList;

import React, { useState, useEffect } from "react";
import "./generate.css";

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
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    // Fetch flashcards from API when component mounts
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/generate_flashcards/?topic=${newSubject}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch flashcards");
      }
      const data = await response.json();
      if (data.flashcards && data.flashcards.length > 0) {
        setFlashcards(data.flashcards[0].flashcards);
      } else {
        setFlashcards([]);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const handleSubjectSubmit = async () => {
    console.log("Sending request with data:", { subject: newSubject });

    try {
      const response = await fetch(
        `http://localhost:8000/generate_flashcards/?topic=${newSubject}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create flashcards");
      }
      const data = await response.json();
      if (data.flashcards && data.flashcards.length > 0) {
        setFlashcards(data.flashcards[0].flashcards);
        setCurrentCardIndex(0); // Reset to first card
      } else {
        setFlashcards([]);
      }
    } catch (error) {
      console.error("Error creating flashcards:", error);
    }
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
      {flashcards.length > 0 && (
        <Flashcard
          question={flashcards[currentCardIndex].question}
          answer={flashcards[currentCardIndex].answer}
        />
      )}
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
