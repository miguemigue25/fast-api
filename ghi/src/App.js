import { Hero } from "./hero.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar.jsx";
import { Login } from "./Login";
import FlashcardSetsTable from "./FlashcardSetTable";
import FlashcardList from "./generate.jsx";
import Splash from "./splash.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flashcards" element={<FlashcardSetsTable />} />
          <Route path="/generate" element={<FlashcardList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
