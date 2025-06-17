import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ReplyButton from "./ReplyButton";
import VoteButtons from "./VoteButtons";
import CommentForm from "./CommentForm";
import Delete from "./Delete";
import Edit from "./Edit";

const Comment = ({ comment, depth = 0 }) => {
  const { user, content, createdAt, score, replies = [], vote, _id } = comment;
  const { username } = user;
  const [reply, setReply] = useState(false);
  const [repliesState, setRepliesState] = useState(replies);
  const [isEditing, setIsEditing] = useState(false);
  const handleReplySuccess = (newReply) => {
    setRepliesState([...repliesState, newReply]);
    setReply(false);
  };

  return (
    <div className="mx-auto">
      <div className={`flex ${depth > 0 ? "pl-4 md:pl-6" : "pl-0"} pr-2`}>
        {depth > 0 && (
          <div className="w-[24px] flex justify-center">
            <div className="border-l-2 border-violet-200 mr-10"></div>
          </div>
        )}
        {isEditing ? (
          <CommentForm
            username={username}
            editMode={true}
            commentId={_id}
            initialContent={content}
            onSubmitSuccess={(updatedComment) => {
              comment.content = updatedComment.content;
              setIsEditing(false);
            }}
            onEditDone={() => setIsEditing(false)}
          />
        ) : (
          <div className="flex-1 flex flex-col md:items-center">
            <div className="flex flex-col md:flex-row w-full max-w-[730px] mx-auto my-4 rounded-[8px] bg-white p-4">
              <div className="hidden md:block">
                <VoteButtons
                  score={score}
                  vote={vote}
                  commentId={comment._id}
                />
              </div>
              <div className="mx-0 md:mx-4 flex-1">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={
                        user.username !== "juliusomo"
                          ? user.image
                          : `/assets/avatars/image-juliusomo.webp`
                      }
                      alt={`${user.username} avatar`}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <span className="font-bold text-preset-2-md">
                      {user.username}
                    </span>
                    {user.username === "juliusomo" && (
                      <span className="bg-purple-600 text-white font-bold mx-2 rounded-[8px] px-2">
                        you
                      </span>
                    )}
                    <span className="text-grey-500 text-preset-2-reg pl-1">
                      {formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="hidden md:flex">
                    {user.username === "juliusomo" ? (
                      <div className="flex self-center ml-36">
                        <Delete id={_id} />
                        <Edit onEdit={setIsEditing} edit={isEditing} id={_id} />
                      </div>
                    ) : (
                      <ReplyButton onReply={setReply} reply={reply} />
                    )}
                  </div>
                </div>
                <p className="text-grey-500 my-5 font-light text-preset-2-reg">
                  {content.startsWith("@") ? (
                    <>
                      <span className="text-purple-600 font-medium">
                        {content.split(" ")[0]}
                      </span>{" "}
                      {content.split(" ").slice(1).join(" ")}
                    </>
                  ) : (
                    content
                  )}
                </p>
                <div className="md:hidden flex justify-between mt-4">
                  <VoteButtons
                    score={score}
                    vote={vote}
                    commentId={comment._id}
                  />
                  {user.username === "juliusomo" ? (
                    <div className="flex">
                      <Delete id={_id} />
                      <Edit onEdit={setIsEditing} edit={isEditing} id={_id} />
                    </div>
                  ) : (
                    <ReplyButton onReply={setReply} reply={reply} />
                  )}
                </div>
              </div>
            </div>

            {reply && (
              <CommentForm
                username={username}
                type="reply"
                parentId={comment._id}
                replyingToUser={user._id}
                onSubmitSuccess={handleReplySuccess}
              />
            )}

            <div className="pl-4">
              {repliesState.map((replyComment) => (
                <Comment
                  key={replyComment._id}
                  comment={replyComment}
                  depth={depth + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
