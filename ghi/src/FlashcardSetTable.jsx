// import React, { useState, useEffect } from "react";
// import FlashcardModal from "./FlashcardModal";
// import useToken from "@galvanize-inc/jwtdown-for-react";

// const FlashcardSetsTable = () => {
//   const { token } = useToken();
//   const [flashcardSets, setFlashcardSets] = useState([]);
//   const [selectedFlashcardId, setSelectedFlashcardId] = useState(null);
//   const [selectedFlashcardTopic, setSelectedFlashcardTopic] = useState(null);

//   // Function to fetch user data
//   const getUserData = async () => {
//     try {
//       const userUrl = `${process.env.REACT_APP_API_HOST}/token`;
//       const response = await fetch(userUrl, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log("User data:", data);
//         // Do something with the user data if needed
//       } else {
//         console.error("Failed to fetch user data:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // Function to fetch data from API endpoint
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/flashcards", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Fetched flashcard sets:", data);
//         // Set the fetched data to the state
//         setFlashcardSets(data.flashcards);
//       } else {
//         console.error("Failed to fetch flashcard sets:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching flashcard sets:", error);
//     }
//   };

//   useEffect(() => {
//     // Call getUserData and fetchData functions
//     getUserData();
//     fetchData();
//   }, [token]); // Dependency on token

//   // Function to handle row click event
//   const handleRowClick = (flashcardId, topic) => {
//     setSelectedFlashcardId(flashcardId);
//     setSelectedFlashcardTopic(topic);
//   };

//   // Function to handle delete button click
//   const handleDelete = async (flashcardId, event) => {
//     // Prevent the row click event from being triggered
//     event.stopPropagation();

//     try {
//       const response = await fetch(
//         `http://localhost:8000/flashcards/${flashcardId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         console.log("Flashcard deleted successfully");
//         // Remove the deleted flashcard from the local state
//         setFlashcardSets((prevFlashcardSets) =>
//           prevFlashcardSets.filter((set) => set.flashcard_id !== flashcardId)
//         );
//       } else {
//         console.error("Failed to delete flashcard:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting flashcard:", error);
//     }
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setSelectedFlashcardId(null);
//     setSelectedFlashcardTopic(null);
//   };

//   return (
//     <div className="table-container">
//       <h2>Flashcard Sets</h2>
//       <div className="outer-container">
//         <table className="flashcard-sets-table topic-header">
//           <thead>
//             <tr>
//               <th>Topic</th>
//               <th>Quantity</th>
//               <th>Action</th> {/* Add a new column for delete button */}
//             </tr>
//           </thead>
//           <tbody>
//             {flashcardSets.map((set) => (
//               <tr
//                 key={set.flashcard_id}
//                 onClick={() => handleRowClick(set.flashcard_id, set.topic)}
//               >
//                 <td>{set.topic}</td>
//                 <td>{set.flashcards.length}</td>
//                 <td>
//                   <button
//                     onClick={(event) => handleDelete(set.flashcard_id, event)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedFlashcardId && (
//         <FlashcardModal
//           flashcardId={selectedFlashcardId}
//           onClose={closeModal}
//           topic={selectedFlashcardTopic}
//         />
//       )}
//     </div>
//   );
// };

// export default FlashcardSetsTable;

import React, { useState, useEffect } from "react";
import FlashcardModal from "./FlashcardModal";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./FlashCardSetTable.css"; // Import CSS file for styling

const FlashcardSetsTable = () => {
  const { token } = useToken();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedFlashcardId, setSelectedFlashcardId] = useState(null);
  const [selectedFlashcardTopic, setSelectedFlashcardTopic] = useState(null);

  // Function to fetch user data
  const getUserData = async () => {
    try {
      const userUrl = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(userUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        // Do something with the user data if needed
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to fetch data from API endpoint
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/flashcards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched flashcard sets:", data);
        // Set the fetched data to the state
        setFlashcardSets(data.flashcards);
      } else {
        console.error("Failed to fetch flashcard sets:", response.status);
      }
    } catch (error) {
      console.error("Error fetching flashcard sets:", error);
    }
  };

  useEffect(() => {
    // Call getUserData and fetchData functions
    getUserData();
    fetchData();
  }, [token]); // Dependency on token

  // Function to handle row click event
  const handleRowClick = (flashcardId, topic) => {
    setSelectedFlashcardId(flashcardId);
    setSelectedFlashcardTopic(topic);
  };

  // Function to handle delete button click
  const handleDelete = async (flashcardId, event) => {
    // Prevent the row click event from being triggered
    event.stopPropagation();

    try {
      const response = await fetch(
        `http://localhost:8000/flashcards/${flashcardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Flashcard deleted successfully");
        // Remove the deleted flashcard from the local state
        setFlashcardSets((prevFlashcardSets) =>
          prevFlashcardSets.filter((set) => set.flashcard_id !== flashcardId)
        );
      } else {
        console.error("Failed to delete flashcard:", response.status);
      }
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedFlashcardId(null);
    setSelectedFlashcardTopic(null);
  };

  return (
    <div className="table-container">
      <h2>Flashcard Sets</h2>
      <div className="outer-container">
        <table className="flashcard-sets-table topic-header">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Quantity</th>
              <th>Remove</th> {/* Add a new column for delete button */}
            </tr>
          </thead>
          <tbody>
            {flashcardSets.map((set) => (
              <tr
                key={set.flashcard_id}
                onClick={() => handleRowClick(set.flashcard_id, set.topic)}
              >
                <td>{set.topic}</td>
                <td>{set.flashcards.length}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={(event) => handleDelete(set.flashcard_id, event)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedFlashcardId && (
        <FlashcardModal
          flashcardId={selectedFlashcardId}
          onClose={closeModal}
          topic={selectedFlashcardTopic}
        />
      )}
    </div>
  );
};

export default FlashcardSetsTable;
