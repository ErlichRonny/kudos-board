import { useState } from "react";

export default function CreateCardModal({ onClose, onCreateCard, boardId }) {
  const [message, setMessage] = useState("");
  const [gifURL, setGifURL] = useState("");
  const [author, setAuthor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [errors, setErrors] = useState("");

  const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const searchGifs = () => {
    if (!searchTerm) {
      return;
    }
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=6`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to search GIFs");
        }
        return response.json();
      })
      .then((data) => {
        setGifs(data.data || []);
      })
      .catch((error) => {
        console.error("Error", error);
        setErrors("Error with searching GIFs");
      });
  };

  const selectGif = (gif) => {
    setGifURL(gif.images.original.url);
    setGifs([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors("");
    if (!message) {
      setErrors("Message is required");
      return;
    }
    if (!gifURL) {
      setErrors("Gif is required");
      return;
    }

    const newCardData = {
      message: message,
      gifURL,
      author: author || "",
      boardId: parseInt(boardId),
    };

    onCreateCard(newCardData);
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
            <h2 id="modalTitle"> Create New Card </h2>
            <form onSubmit={handleSubmit}>
              <div className="formContent">
                <label> Message * </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter card message"
                />
              </div>
              <div className="formContent">
                <label> Seach for GIF *</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search GIFs"
                />
                <button type="button" onClick={searchGifs}>
                  {" "}
                  Search{" "}
                </button>
              </div>

              {gifURL && (
                <div className="formContent">
                  <img src={gifURL} />
                </div>
              )}

              {gifs.length > 0 && (
                <div className="formContent">
                  <div className="gifsGrid">
                    {gifs.map((gif) => (
                      <img
                        key={gif.id}
                        src={gif.images.fixed_height.url}
                        onClick={() => selectGif(gif)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="formContent">
                <label> Author (optional) </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
              <div className="modalButton">
                <button type="submit" className="createBtn">
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
