import BoardCard from "./BoardCard";
import { useState } from "react";

export default function BoardPage({ board, handleBack }) {
  const [cards, setCards] = useState(board.board_content || []);

  const handleUpvote = (index) => {
    console.log(`Upvoted card ${index}`);
  };

  const handleDelete = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="boardContent">
      <button type="button" onClick={handleBack}>
        {" "}
        Back{" "}
      </button>
      <h3> Board Title: {board.board_title} </h3>
      <p> Author: {board.board_author} </p>
      <button type="button"> Create a Card </button>
      {cards.map((card, index) => (
        <BoardCard
          key={index}
          title={`Card ${index + 1}`}
          text={card}
          onUpvote={() => handleUpvote(index)}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
}
