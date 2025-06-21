import grey from "../assets/grey.jpeg";

export default function BoardCover({
  board,
  handleViewBoard,
  handleDeleteBoard,
}) {
  return (
    <div className="coverContent">
      <img src={grey} alt="Board cover" />
      <h3> Board Title: {board.title} </h3>
      <p> Category: {board.category} </p>
      <div className="coverButtons">
        <button type="button" onClick={handleViewBoard}>
          View Board
        </button>
        <button type="button" onClick={() => handleDeleteBoard(board.id)}>
          Delete Board
        </button>
      </div>
    </div>
  );
}
