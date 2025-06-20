import { createPortal } from "react-dom";
import { useState } from "react";

export default function CreateBoardModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      alert("Title is required");
    }
    if (!category) {
      alert("Category is required");
    }

    const newBoard = {
        board_title: title,
        board_category: category,
        board_author: author || "",
        created_date: new Date(),
        board_image: "",
        board_content: []
    }

    onCreateBoard(newBoard);
    onClose();
  };
  return (
    <>
      <div className="modal-backdrop">
        <div className="createModal">
          <div className="modalContent">
            <button onClick={onClose} id="closeModalBtn">
              𝘅
            </button>
            <h2 id="modalTitle"> Create New Board </h2>
            <p> Title: </p>
            <p> Category: </p>
            <p> Author: </p>
            {createPortal(<p> portal content </p>, document.body)}
          </div>
        </div>{" "}
      </div>
    </>
  );
}
