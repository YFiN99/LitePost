import { useEffect, useState } from "react";

import {
  getComments,
  commentPost,
} from "../hooks/useSocial";

export default function CommentModal({
  post,
  open,
  onClose,
  onRefresh,
}) {
  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && post) {
      loadComments();
    }
  }, [open, post]);

  async function loadComments() {
    try {
      const data = await getComments(post.id);

      setComments(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleComment() {
    if (text.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    try {
      setLoading(true);

      await commentPost(post.id, text);

      setText("");

      await loadComments();

      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);

      alert(
        err.reason ||
          err.shortMessage ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>Comments</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={Number(comment.id)}
                className="comment-card"
              >
                <strong>

                  {comment.author.slice(0, 6)}
                  ...
                  {comment.author.slice(-4)}

                </strong>

                <p>{comment.content}</p>

                <small>

                  {new Date(
                    Number(comment.timestamp) * 1000
                  ).toLocaleString()}

                </small>

              </div>
            ))
          )}

        </div>

        <div className="modal-footer">

          <textarea
            className="input"
            rows="3"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <button
            className="publish"
            onClick={handleComment}
            disabled={loading}
          >
            {loading
              ? "Posting..."
              : "Post Comment"}
          </button>

        </div>

      </div>

    </div>
  );
}