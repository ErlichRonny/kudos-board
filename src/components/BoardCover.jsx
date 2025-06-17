import grey from "../assets/grey.jpeg";
import { useState } from "react";
import BoardPage from "./BoardPage";

export default function BoardCover({
  boardTitle,
  boardCategory,
  // boardImage,
  // boardAuthor,
  // boardContents
  boardView,
  setBoardView,
}) {
  const handleBoardClick = () => {
    setBoardView(true);
  };
  return (
    <div className="coverContent">
      {!boardView && (
        <>
          <img src={grey} />
          <h3> Board Title: {boardTitle} </h3>
          <p> Category: {boardCategory} </p>
          <div className="coverButtons">
            <button type="button" onClick={handleBoardClick}>
              {" "}
              View Board{" "}
            </button>
            <button type="delete"> Delete Board </button>
          </div>
        </>
      )}
      {boardView && (
        <>
          <BoardPage />
        </>
      )}
    </div>
  );
}
