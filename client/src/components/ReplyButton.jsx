const ReplyButton = ({ onReply, reply }) => {
  return (
    <button
      onClick={() => onReply(!reply)}
      className="flex cursor-pointer duration-200 justify-center items-center text-purple-600 font-bold text-preset-2-md hover:opacity-80"
    >
      <svg
        className="mr-2 hover:opacity-80"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.227189 5.19083L5.0398 1.03498C5.46106 0.671178 6.125 0.966522 6.125 1.53165V3.7206C10.5172 3.77089 14 4.65118 14 8.81361C14 10.4936 12.9177 12.158 11.7214 13.0282C11.348 13.2997 10.816 12.9589 10.9536 12.5187C12.1935 8.55357 10.3655 7.50088 6.125 7.43984V9.84378C6.125 10.4098 5.46056 10.7038 5.0398 10.3404L0.227189 6.18418C-0.0755195 5.92272 -0.0759395 5.45266 0.227189 5.19083Z"
          fill="currentColor"
        />
      </svg>
      Reply
    </button>
  );
};

export default ReplyButton;
