import BoardCover from "./BoardCover";
import { useState } from "react";
import data from "../data.json";
import CreateBoardModal from "./CreateBoardModal";

export default function HomePage({ handleViewBoard }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [boards, setBoards] = useState(data);
  const [filteredBoards, setFilteredBoards] = useState(data);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const applyFilters = (query, category, boardsList) => {
    let filtered = boardsList;

    if (category === "all") {
      filtered = boardsList;
    } else if (category === "recent") {
      const sortedBoards = [...boardsList].sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      filtered = [];
      for (let i = 0; i < Math.min(6, sortedBoards.length); i++) {
        filtered.push(sortedBoards[i]);
      }
    } else {
      filtered = boardsList.filter(
        (board) => board.board_category.toLowerCase() === category.toLowerCase()
      );
    }

    if (query) {
      filtered = filtered.filter(
        (board) =>
          board.board_title.toLowerCase().includes(query.toLowerCase()) ||
          board.board_author.toLowerCase().includes(query.toLowerCase())
      );
    }
    return filtered;
  };

  const handleCreateBoard = (newBoard) => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleAddNewBoard = (newBoard) => {
    const updatedBoards = [newBoard, ...boards];
    setBoards(updatedBoards);

    const filtered = applyFilters(searchQuery, selectedCategory, updatedBoards);
    setFilteredBoards(filtered);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = applyFilters(query, selectedCategory, boards);
    setFilteredBoards(filtered);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = applyFilters(searchQuery, category, boards);
    setFilteredBoards(filtered);
  };

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    const filtered = applyFilters("", selectedCategory, boards);
  };

  const handleDeleteBoard = (boardTitle) => {
    const updatedBoards = boards.filter(
      (board) => board.board_title !== boardTitle
    );

    setBoards(updatedBoards);
    const filtered = applyFilters(searchQuery, selectedCategory, updatedBoards);
    setFilteredBoards(filtered);
  };

  return (
    <div className="homePage">
      <div className="searchBar">
        <form>
          <input
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(event) => handleEnter(event)}
            placeholder="Search movies..."
            className="input"
          />
          <button id="searchBtn" type="button" onClick={handleSearch}>
            {" "}
            🔍{" "}
          </button>
          {searchQuery && (
            <button
              id="clearBtn"
              className="clearBtn"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </form>
      </div>
      <div className="categoryFilter">
        <h3> Filter by Category: </h3>
        <div className="categoryButtons">
          <button className="all" onClick={() => handleCategoryChange("all")}>
            {" "}
            All{" "}
          </button>
          <button
            className="recent"
            onClick={() => handleCategoryChange("recent")}
          >
            {" "}
            Recent{" "}
          </button>
          <button
            className="celebration"
            onClick={() => handleCategoryChange("celebration")}
          >
            {" "}
            Celebration{" "}
          </button>
          <button
            className="thank you"
            onClick={() => handleCategoryChange("thank you")}
          >
            {" "}
            Thank you{" "}
          </button>
          <button
            className="inspiration"
            onClick={() => handleCategoryChange("inspiration")}
          >
            Inspiration
          </button>
        </div>
      </div>
      <button className="button" onClick={handleCreateBoard}>
        {" "}
        Create New Board{" "}
      </button>
      {showCreateModal && (
        <CreateBoardModal
          onClose={handleCloseModal}
          onCreateBoard={handleAddNewBoard}
        />
      )}
      <div className="boards">
        {filteredBoards.map((board) => {
          return (
            <BoardCover
              key={board.board_title}
              board={board}
              handleViewBoard={() => handleViewBoard(board)}
              handleDeleteBoard={handleDeleteBoard}
            />
          );
        })}
      </div>

      {filteredBoards.length === 0 && searchQuery && (
        <div>No boards found matching {searchQuery}</div>
      )}
    </div>
  );
}
