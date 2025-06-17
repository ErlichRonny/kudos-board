import grey from "../assets/grey.jpeg";

export default function BoardCard() {
  return (
    <div className="cardContent">
      <h3> Card Title </h3>
      <p> Card text </p>
      <img src={grey} />
      <div className="cardButtons">
        <button type="button"> Upvote </button>
        <button type="delete"> Delete </button>
      </div>¸
    </div>
  );
}
