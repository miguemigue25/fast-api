// // import React, { useEffect, useState } from "react";
// // import FlashcardModal from "./FlashcardModal";

// // const FlashcardSetsTable = () => {
// //   const [flashcardSets, setFlashcardSets] = useState([]);
// //   const [selectedFlashcard, setSelectedFlashcard] = useState(null);

// //   useEffect(() => {
// //     // Fetch data from API endpoint
// //     fetch("http://localhost:8000/flashcards")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         console.log("Fetched flashcard sets:", data);
// //         // Set the fetched data to the state
// //         setFlashcardSets(data.flashcards);
// //       })
// //       .catch((error) => console.error("Error fetching data:", error));
// //   }, []); // Empty dependency array to fetch data only once

// //   // Function to handle row click event
// //   const handleRowClick = (flashcardId) => {
// //     // Fetch single flashcard by ID
// //     fetch(`http://localhost:8000/flashcards/${flashcardId}`)
// //       .then((response) => response.json())
// //       .then((data) => {
// //         console.log("Fetched flashcard:", data);
// //         setSelectedFlashcard(data.flashcard);
// //       })
// //       .catch((error) => console.error("Error fetching flashcard:", error));
// //   };

// //   // Function to close the modal
// //   const closeModal = () => {
// //     setSelectedFlashcard(null);
// //   };

// //   console.log("Selected flashcard:", selectedFlashcard);

// //   return (
// //     <div className="table-container">
// //       <h2>Flashcard Sets</h2>
// //       <div className="outer-container">
// //         <table className="flashcard-sets-table">
// //           <thead>
// //             <tr>
// //               <th>Topic</th>
// //               <th>Flashcards</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {flashcardSets.map((set) => (
// //               <tr
// //                 key={set.flashcard_id}
// //                 onClick={() => handleRowClick(set.flashcard_id)}
// //               >
// //                 <td>{set.topic}</td>
// //                 <td>{set.flashcards.length}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       {selectedFlashcard && (
// //         <FlashcardModal flashcard={selectedFlashcard} onClose={closeModal} />
// //       )}
// //     </div>
// //   );
// // };

// export default FlashcardSetsTable;
import React, { useEffect, useState } from "react";
import FlashcardModal from "./FlashcardModal";

const FlashcardSetsTable = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedFlashcardId, setSelectedFlashcardId] = useState(null);

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
  const handleRowClick = (flashcardId) => {
    setSelectedFlashcardId(flashcardId);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedFlashcardId(null);
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
              <tr
                key={set.flashcard_id}
                onClick={() => handleRowClick(set.flashcard_id)}
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
        />
      )}
    </div>
  );
};

export default FlashcardSetsTable;
