import grey from "../assets/grey.jpeg";
import { useState } from "react";
import BoardPage from "./BoardPage";

export default function BoardCover({
  board,
  handleViewBoard,
  handleDeleteBoard,
}) {
  return (
    <div className="coverContent">
      <img src={grey} alt="Board cover" />
      <h3> Board Title: {board.board_title} </h3>
      <p> Category: {board.board_category} </p>
      <div className="coverButtons">
        <button type="button" onClick={handleViewBoard}>
          View Board
        </button>
        <button
          type="button"
          onClick={() => handleDeleteBoard(board.board_title)}
        >
          Delete Board
        </button>
      </div>
    </div>
  );
}
