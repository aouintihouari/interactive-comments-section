import { useState } from "react";
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";

const Delete = ({ id }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/comments/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex justify-center items-center cursor-pointer"
      >
        <p className="text-pink-400 font-bold mr-2">Delete</p>
        <svg
          className="md:mr-4"
          width="12"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
            fill="#ED6368"
          />
        </svg>
      </div>

      {showModal && (
        <ConfirmDelete
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default Delete;
