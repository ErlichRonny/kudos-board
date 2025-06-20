import BoardCard from "./BoardCard";
import CreateCardModal from "./CreateCardModal";
import { useState, useEffect } from "react";

export default function BoardPage({ board, handleBack }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

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
    fetch(`http://localhost:3000/cards/${cardId}/upvote`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upvote the card.");
        }
        return response.json();
      })
      .then((updatedCard) => {
        setCards(
          cards.map((card) =>
            card.id === cardId
              ? { ...card, upvotes: updatedCard.upvotes }
              : card
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to upvote card. Please try again later.");
      });
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

  const handleCreateCard = (newCardData) => {
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
      <button type="button" onClick={() => setShowCreateModal(true)}>
        {" "}
        Create a Card{" "}
      </button>
      {cards.map((card) => (
        <BoardCard
          key={card.id}
          title={card.title}
          text={card.message}
          image={card.gifURL}
          author={card.author}
          upvotes={card.upvotes || 0}
          handleUpvote={() => handleUpvote(card.id)}
          handleDelete={() => handleDelete(card.id)}
        />
      ))}

      {showCreateModal && (
        <CreateCardModal
          onClose={() => setShowCreateModal(false)}
          onCreateCard={handleCreateCard}
          boardId={board.id}
        />
      )}
    </div>
  );
}
