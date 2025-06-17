import BoardCover from "./BoardCover";
import { useState } from "react";
import data from "../data.json";

export default function HomePage({ boardView, setBoardView }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    onSearch(searchQuery.trim());
  };

  const handleClear = (event) => {
    if (event) {
      event.preventDefault();
    }
    setSearchQuery("");
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
      <button className="button"> Create New Board </button>
      <div className="boards">
        {data.map((board) => {
          return (
            <BoardCover
              key={board.board_title}
              boardTitle={board.board_title}
              boardCategory={board.board_author}
              boardImage={board.board_image}
              boardAuthor={board.board_author}
              boardContents={board.board_content}
              boardView={boardView}
              setBoardView={setBoardView}
            />
          );
        })}
      </div>
    </div>
  );
}
