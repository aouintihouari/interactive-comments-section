import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/v1/comments");
        setComments(response.data.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  return (
    <>
      <div className="w-full">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} depth={0} />
        ))}
      </div>
      <CommentForm
        onSubmitSuccess={(newComment) => {
          setComments((prev) => [...prev, { ...newComment, replies: [] }]);
        }}
      />
    </>
  );
};

export default CommentList;
