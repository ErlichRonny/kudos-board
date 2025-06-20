import { useEffect, useState } from "react";
import BoardCover from "./BoardCover";

export default function BoardList({
  boards,
  setBoards,
  filters,
  handleViewBoard,
}) {
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    applyFilters(filters, boards);
  }, [filters, boards]);

  const applyFilters = (filterOptions, boardsList) => {
    let filtered = boardsList;

    if (filterOptions.category === "all") {
      filtered = boardsList;
    } else if (filterOptions.category === "recent") {
      const sortedBoards = [...boardsList].sort((a, b) => b.id - a.id);
      filtered = [];
      for (let i = 0; i < Math.min(6, sortedBoards.length); i++) {
        filtered.push(sortedBoards[i]);
      }
    } else {
      filtered = boardsList.filter(
        (board) =>
          board.category.toLowerCase() ===
          filterOptions.category.toLowerCase()
      );
    }

    if (filterOptions.searchQuery) {
      filtered = filtered.filter(
        (board) =>
          board.title
            .toLowerCase()
            .includes(filterOptions.searchQuery.toLowerCase()) ||
          board.author
            .toLowerCase()
            .includes(filterOptions.searchQuery.toLowerCase())
      );
    }
    setFilteredBoards(filtered);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/boards/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the board.");
        }

        setBoards((prevBoards) =>
          prevBoards.filter((board) => board.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to delete board. Please try again later.");
      });
  };

  if (error) return <div>Error: {error}</div>;
  if (!boards.length) return <div> No boards found </div>;

  return (
    <div className="boards-container">
      {filteredBoards.map((board) => (
        <BoardCover
          key={board.id}
          board={board}
          handleViewBoard={() => handleViewBoard(board)}
          handleDeleteBoard={() => handleDelete(board.id)}
        />
      ))}

      {filteredBoards.length === 0 && filters.searchQuery && (
        <div>No boards found matching {filters.searchQuery}</div>
      )}
    </div>
  );
}
