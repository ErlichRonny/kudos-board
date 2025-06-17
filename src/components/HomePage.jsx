import BoardCover from "./BoardCover";
import { useState } from "react";
import data from "../data.json";

export default function HomePage({ handleCreateBoard, handleViewBoard }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [boards, setBoards] = useState(data);
  const [filteredBoards, setFilteredBoards] = useState(data);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = boards.filter(
        (board) =>
          board.board_title.toLowerCase().includes(query.toLowerCase()) ||
          board.board_author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBoards(filtered);
    } else {
      setFilteredBoards(boards);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setFilteredBoards(boards);
  };

  const handleDeleteBoard = (boardTitle) => {
    const updatedBoards = boards.filter(
      (board) => board.board_title !== boardTitle
    );

    setBoards(updatedBoards);
    setFilteredBoards(
      updatedBoards.filter(
        (board) =>
          !searchQuery ||
          board.board_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          board.board_author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
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
      <button className="button" onClick={handleCreateBoard}>
        {" "}
        Create New Board{" "}
      </button>
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
