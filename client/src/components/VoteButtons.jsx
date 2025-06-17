import axios from "axios";
import { useState } from "react";

const VoteButtons = ({ score = 0, vote, commentId }) => {
  const [currentVote, setCurrentVote] = useState(vote);
  const [currentScore, setCurrentScore] = useState(score);
  const handleVote = async (type) => {
    if (type === currentVote) return;
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${commentId}/vote`,
        {
          type,
        }
      );
      const newVote = res.data.data.comment.vote;
      const newScore = res.data.data.comment.score;
      setCurrentVote(newVote);
      setCurrentScore(newScore);
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  return (
    <div>
      <div className="bg-grey-50 p-2 md:h-24 md:my-6 md:p-1 rounded-b-lg flex md:flex-col justify-center items-center font-bold text-purple-600">
        <svg
          onClick={() => handleVote("upvote")}
          className={`mr-2 md:mx-auto cursor-pointer ${
            currentVote === "upvote" ? "opacity-100" : "opacity-80"
          } hover:opacity-100`}
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-purple-600 opacity-100 px-4 md:px-2 md:my-3">
          {currentScore}
        </span>
        <svg
          onClick={() => handleVote("downvote")}
          className={`mr-2 md:mx-auto cursor-pointer ${
            currentVote === "downvote" ? "opacity-100" : "opacity-80"
          } hover:opacity-100`}
          width="11"
          height="3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default VoteButtons;
