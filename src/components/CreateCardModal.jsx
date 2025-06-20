import { createPortal } from "react-dom";

export default function CreateCardModal({ onClose }) {
  return (
    <>
      <div className="modal-backdrop">
        <div className="createModal">
          <div className="modalContent">
            <button onClick={onClose} id="closeModalBtn">
              𝘅
            </button>
            <h2 id="modalTitle"> Create New Board </h2>
            <p> Card title: </p>
            <p> Description: </p>
            <p> Insert gif here: </p>
            <p> Author (optional): </p>

            {createPortal(<p> portal content </p>, document.body)}
          </div>
        </div>{" "}
      </div>
    </>
  );
}
