import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
  const [count, setCount] = useState(0);
  const [boardView, setBoardView] = useState(false);

  return (
    <>
      <div>
        <HomePage boardView={boardView} setBoardView={setBoardView} />
      </div>
    </>
  );
}

export default App;
