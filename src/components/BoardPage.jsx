import BoardCard from "./BoardCard";
import { useState, useEffect } from "react";

export default function BoardPage({ board, handleBack }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cards for this board
  useEffect(() => {
    fetch(`http://localhost:3000/boards/${board.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response failed");
        }
        return response.json();
      })
      .then((data) => {
        setCards(data.cards || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setError("Failed to fetch cards. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleUpvote = (cardId) => {
    console.log(`Upvoted card ${cardId}`);
    // TODO: add upvote api call
  };

  const handleDelete = (cardId) => {
    fetch(`http://localhost:3000/cards/${cardId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the card.");
        }

        setCards(cards.filter((card) => card.id !== cardId));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to delete card. Please try again later.");
      });
  };

  const handleAddCard = () => {
    const newCardData = {
      message: "New message",
      gifURL: "",
      author: "Author",
      boardId: board.id,
    };

    fetch(`http://localhost:3000/boards/${board.id}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCardData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Failed to create card.");
      })
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to create card");
      });
  };

  if (error) {
    return <div> Error: {error} </div>;
  }

  if (isLoading) {
    return <div> Loading cards...</div>;
  }

  return (
    <div className="boardContent">
      <button type="button" onClick={handleBack}>
        {" "}
        Back{" "}
      </button>
      <h3> Board Title: {board.title} </h3>
      <p> Author: {board.author} </p>
      <button type="button"> Create a Card </button>
      {cards.map((card) => (
        <BoardCard
          key={card.id}
          title={`Card ${card.id}`}
          text={card.message}
          onUpvote={() => handleUpvote(card.id)}
          onDelete={() => handleDelete(card.id)}
        />
      ))}
    </div>
  );
}
