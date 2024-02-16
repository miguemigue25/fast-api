import "./App.css";
import SplashPage from "./components/ui/splash";
import Navbar from "./components/ui/Navbar";
import { Route, Routes } from "react-router-dom";
import flashCardMain from "./components/ui/flashcardmain";

function App() {
  return (
    <div className="fixed top-0 left-0 w-full ">
      <Navbar />
      <Routes>
        <Route path="/" element={<SplashPage title={"splash"} />} />
        <Route path="/flashcardmaker" element={flashCardMain()} />
      </Routes>

      <div></div>
    </div>
  );
}

export default App;
