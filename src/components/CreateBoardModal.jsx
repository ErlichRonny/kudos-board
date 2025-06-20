import { useState } from "react";

export default function CreateBoardModal({ onClose, onBoardCreated }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors();
    const newErrors = {};
    if (!title) {
      setErrors("Title is required");
    }
    if (!category) {
      setErrors("Category is required");
    }

    const newBoard = {
      title: title,
      category: category,
      author: author || "",
    };

    setIsLoading(true);

    fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoard),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Failed to create board.");
      })
      .then((data) => {
        onBoardCreated(data);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrors("Failed to create board");
        setIsLoading(false);
      });
  };

  if (errors) {
    return (
      <div className="modal-backdrop">
        <div className="createModal">
          <div className="modalContent"></div>
          <button onClick={onClose} id="closeModalBtn">
            𝘅
          </button>
          <div> Error: {errors} </div>;
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="modal-backdrop">
        <div className="createModal">
          <div className="modalContent"></div>
          <div> Creating board...</div>;
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="modal-backdrop">
        <div className="createModal">
          <div className="modalContent">
            <button onClick={onClose} id="closeModalBtn">
              𝘅
            </button>
            <h2 id="modalTitle"> Create New Board </h2>
            <form onSubmit={handleSubmit}>
              <div className="formContent">
                <label> Title * </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter board title"
                />
              </div>
              <div className="formContent">
                <label> Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value=""> Select a category </option>
                  <option value="celebration"> Celebration </option>
                  <option value="thank you"> Thank you </option>
                  <option value="inspiration"> Inspiration </option>
                </select>
              </div>
              <div className="formContent">
                <label> Author </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
              <div className="modalButton">
                <button type="submit" className="createBtn">
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
