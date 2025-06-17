import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CommentForm = ({
  username,
  type,
  parentId,
  replyingToUser,
  onSubmitSuccess,
  initialContent = "",
  editMode = false,
  commentId,
  onEditDone,
}) => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState(() => {
    if (initialContent) return initialContent;
    if (type === "reply" && username) return `@${username} `;
    return "";
  });
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    try {
      let response;
      if (editMode) {
        response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/v1/comments/${commentId}`,
          {
            content: trimmedContent,
          }
        );
        onSubmitSuccess(response.data.data.comment, "edit");
        if (onEditDone) onEditDone();
      } else if (type === "reply") {
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/comments/${parentId}/replies`,
          {
            content: trimmedContent,
            user: "684c63a4f75704297ab13b5c",
            replyingToUser,
          }
        );
        onSubmitSuccess(response.data.data.reply, "reply");
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/comments`,
          {
            content,
            user: "684c63a4f75704297ab13b5c",
          }
        );
        onSubmitSuccess(response.data.data.comment, "comment");
      }
      setContent("");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full md:min-w-[920px] l my-2">
      <div className="flex justify-between bg-white p-3 w-full max-w-[730px] mx-auto rounded-[8px]">
        <img
          className="w-8 h-8 mr-2 rounded-full"
          src="./assets/avatars/image-juliusomo.webp"
          alt="juliusomo"
        />
        <textarea
          className="w-full border mx-4 border-gray-300 min-h-20 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-900 focus:border-transparent"
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment ..."
        />
        <button
          type="submit"
          className="flex items-center max-h-10 text-white text-preset-2-md rounded-lg p-3 cursor-pointer hover:opacity-80 duration-200 bg-purple-600"
        >
          {editMode ? "UPDATE" : type === "reply" ? "REPLY" : "SEND"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
