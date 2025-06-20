export default function BoardCard({
  title,
  text,
  image,
  handleUpvote,
  handleDelete,
}) {
  return (
    <div className="cardContent">
      <h3> Card Title: {title} </h3>
      <p> Card text: {text} </p>
      {image && <img src={image} />}

      <div className="cardButtons">
        <button type="button" onClick={handleUpvote}>
          {" "}
          Upvote{" "}
        </button>
        <button type="button" onClick={handleDelete}>
          {" "}
          Delete{" "}
        </button>
      </div>
    </div>
  );
}
