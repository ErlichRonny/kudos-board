import BoardCard from "./BoardCard";

export default function BoardPage() {
  return (
    <div className="boardContent">
        <button type="button"> Back </button>
      <h3> Board Title </h3>
      <button type="button"> Create a Card </button>
      <BoardCard/>
    </div>
  );
}
