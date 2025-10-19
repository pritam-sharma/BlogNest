import React, { useState, useEffect } from "react";
import CommentsList from "./CommentLists";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";

const AddComment = ({ postId, comments }) => {
  const [formData, setFormData] = useState({ message: "" });
  const dispatch = useDispatch();
  const { success, loading } = useSelector((state) => state?.comments);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    dispatch(createCommentAction({ ...formData, postId }));
  };

  useEffect(() => {
    if (success) {
      setFormData({ message: "" });
    }
  }, [success]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          {/* Avatar */}
          <img
            src="https://placehold.co/50x50?text=U"
            alt="avatar"
            className="w-12 h-12 rounded-full border border-gray-200 object-cover"
          />

          {/* Input Box */}
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            <div className="p-3">
              <textarea
                id="comment"
                rows={3}
                className="w-full bg-transparent resize-none text-sm text-gray-700 focus:outline-none focus:ring-0"
                placeholder="Write a comment..."
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end border-t border-gray-200 p-3 bg-gray-50 rounded-b-xl">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <CommentsList comments={comments} />
    </div>
  );
};

export default AddComment;
