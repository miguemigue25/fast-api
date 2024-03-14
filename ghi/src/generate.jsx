// import React, { useState, useEffect } from "react";
// import "./generate.css";
// import useToken from "@galvanize-inc/jwtdown-for-react";

// const Flashcard = ({ question, answer }) => {
//   const [isAnswerShown, setIsAnswerShown] = useState(false);

//   const toggleAnswer = () => {
//     setIsAnswerShown(!isAnswerShown);
//   };

//   return (
//     <div className="flashcard-gen" onClick={toggleAnswer}>
//       <div className="question">{question}</div>
//       {isAnswerShown && <div className="answer">{answer}</div>}
//     </div>
//   );
// };

// const FlashcardList = () => {
//   const { token } = useToken();
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
//         `http://localhost:8000/generate_flashcards/?topic=${newSubject}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in request headers
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch flashcards");
//       }
//       const data = await response.json();
//       if (data.flashcards && data.flashcards.length > 0) {
//         setFlashcards(data.flashcards[0].flashcards);
//       } else {
//         setFlashcards([]);
//       }
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
//             Authorization: `Bearer ${token}`, // Include token in request headers
//           },
//           body: JSON.stringify({}),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to create flashcards");
//       }
//       const data = await response.json();
//       if (data.flashcards && data.flashcards.length > 0) {
//         setFlashcards(data.flashcards[0].flashcards);
//         setCurrentCardIndex(0); // Reset to first card
//       } else {
//         setFlashcards([]);
//       }
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
//         <div className="button-mover">
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
import useToken from "@galvanize-inc/jwtdown-for-react";

const Flashcard = ({ question, answer, isAnswerShown, toggleAnswer }) => {
  const handleClick = () => {
    // Call the toggleAnswer function passed from the parent
    toggleAnswer();
  };

  return (
    <div className="flashcard-gen" onClick={handleClick}>
      <div className="question">{question}</div>
      {isAnswerShown && <div className="answer">{answer}</div>}
    </div>
  );
};

const FlashcardList = () => {
  const { token } = useToken();
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [newSubject, setNewSubject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/generate_flashcards/?topic=${newSubject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch flashcards");
      }
      const data = await response.json();
      if (data.flashcards && data.flashcards.length > 0) {
        setFlashcards(data.flashcards[0].flashcards);
        setCurrentCardIndex(0);
      } else {
        setFlashcards([]);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setIsLoading(false);
      setIsAnswerShown(false); // Reset isAnswerShown state
    }
  };

  const toggleAnswer = () => {
    setIsAnswerShown(!isAnswerShown);
  };

  const goToNextCard = () => {
    setIsAnswerShown(false); // Reset isAnswerShown state
    setCurrentCardIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevCard = () => {
    setIsAnswerShown(false); // Reset isAnswerShown state
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
            Authorization: `Bearer ${token}`,
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
        setCurrentCardIndex(0);
      } else {
        setFlashcards([]);
      }
    } catch (error) {
      console.error("Error creating flashcards:", error);
    } finally {
      setIsAnswerShown(false); // Reset isAnswerShown state
    }
  };

  return (
    <div className="flashcard-container subject-input">
      <input
        type="text"
        placeholder="Enter new subject"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        style={{
          backgroundColor: "white"
        }}
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
      {isLoading ? (
        <div>Loading...</div>
      ) : flashcards.length > 0 ? (
        <Flashcard
          question={flashcards[currentCardIndex].question}
          answer={flashcards[currentCardIndex].answer}
          isAnswerShown={isAnswerShown}
          toggleAnswer={toggleAnswer} // Pass the toggleAnswer function as a prop
        />
      ) : (
        <Flashcard question=" " answer=" " isAnswerShown={false} />
      )}
      <div className="navigation-buttons">
        <div className="button-mover">
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
