export default function ({ onClose, onCreateBoard }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

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
      created_date: new Date().toISOString,
      board_image: "",
      board_content: [],
    };

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
