import React from "react";

function CommentForm({ handleComment }) {
  return (
    <form onSubmit={handleComment}>
      <input type="text" name="comment"></input> <button>add comment</button>
    </form>
  );
}

export default CommentForm;
