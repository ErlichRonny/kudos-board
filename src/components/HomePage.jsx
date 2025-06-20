import { useState, useEffect } from "react";
import data from "../data.json";
import CreateBoardModal from "./CreateBoardModal";
import BoardList from "./BoardList";

export default function HomePage({ handleViewBoard }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [boards, setBoards] = useState(data);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/boards")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response failed");
        }
        return response.json();
      })
      .then((data) => {
        setBoards(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setError("Failed to fetch boards. Please try again later.");
      });
  }, []);

  const filters = { searchQuery, category: selectedCategory };

  const handleCreateBoard = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleAddNewBoard = (newBoardData) => {
    fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoardData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Failed to create board.");
      })
      .then((data) => {
        setBoards((prevBoards) => [data, ...prevBoards]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to create board");
      });
  };

  // const updatedBoards = [newBoard, ...boards];
  // setBoards(updatedBoards);

  // const filtered = applyFilters(searchQuery, selectedCategory, updatedBoards);
  // setFilteredBoards(filtered);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  // const handleDeleteBoard = (boardTitle) => {
  //   const updatedBoards = boards.filter(
  //     (board) => board.board_title !== boardTitle
  //   );

  //   setBoards(updatedBoards);
  //   const filtered = applyFilters(searchQuery, selectedCategory, updatedBoards);
  //   setFilteredBoards(filtered);
  // };

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
      <BoardList
        boards={boards}
        setBoards={setBoards}
        filters={filters}
        handleViewBoard={handleViewBoard}
      />
    </div>
  );
}
