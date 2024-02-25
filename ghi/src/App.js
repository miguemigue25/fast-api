import { Hero } from "./hero.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar.jsx";

import FlashcardSetsTable from "./FlashcardSetTable";
import FlashcardList from "./generate.jsx";
import Splash from "./splash.jsx";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Signup from "./Signup.js";
import Login from "./Login.js";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/flashcards" element={<FlashcardSetsTable />} />
            <Route path="/generate" element={<FlashcardList />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
