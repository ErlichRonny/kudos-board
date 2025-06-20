export default function BoardCard({
  title,
  text,
  image,
  upvotes = 0,
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
          Upvote: {upvotes}
        </button>
        <button type="button" onClick={handleDelete}>
          {" "}
          Delete{" "}
        </button>
      </div>
    </div>
  );
}
