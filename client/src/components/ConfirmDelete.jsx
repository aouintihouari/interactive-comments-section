const ConfirmDelete = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-white text-gray-800 rounded-[8px] w-10/12 md:w-3/12 max-w-xl p-6 shadow-lg z-60 text-preset-1">
        <h1 className="text-lg font-bold mb-4 text-preset-1">Delete comment</h1>
        <p className="text-preset-2-reg text-grey-500 my-3">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="flex justify-between my-4">
          <button
            onClick={onCancel}
            className="bg-grey-500 px-6 py-4 rounded-[8px] cursor-pointer text-white text-preset-2-md font-bold hover:opacity-80 duration-400"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="bg-pink-400 px-6 py-4 rounded-[8px] cursor-pointer text-white text-preset-2-md font-bold hover:opacity-80 duration-400"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
