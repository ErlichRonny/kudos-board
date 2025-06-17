import grey from "../assets/grey.jpeg";

export default function BoardCard({title, text, handleUpvote, handleDelete}) {
  return (
    <div className="cardContent">
      <h3> Card Title: {title} </h3>
      <p> Card text: {text} </p>
      <img src={grey} />
      <div className="cardButtons">
        <button type="button" onClick={handleUpvote}> Upvote </button>
        <button type="delete"  onClick={handleDelete}> Delete </button>
      </div>
    </div>
  );
}
