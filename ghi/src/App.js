import { Hero } from "./hero.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar.jsx";
import { Login } from "./Login";
import FlashcardSetsTable from "./FlashcardSetTable";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flashcards" element={<FlashcardSetsTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
