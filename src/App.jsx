import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import BoardPage from "./components/BoardPage";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleViewBoard = (board) => {
    setSelectedBoard(board);
    setCurrentView("board");
  };

  const handleBack = () => {
    setCurrentView("home");
    setSelectedBoard(null);
  };
  return (
    <div>
      {currentView === "home" && <HomePage handleViewBoard={handleViewBoard} />}
      {currentView === "board" && selectedBoard && (
        <BoardPage board={selectedBoard} handleBack={handleBack} />
      )}
    </div>
  );
}
export default App;
