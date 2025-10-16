import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector((state) => state?.posts);

  useEffect(() => {
    dispatch(fetchPrivatePostsAction());
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <span className="inline-block py-1 px-3 mb-3 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
          BlogNest
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Explore Fresh & Insightful Articles
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Dive into a collection of inspiring blogs from passionate writers
          around the world.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingComponent />
        </div>
      ) : error ? (
        <h2 className="text-center text-red-500">{error?.message}</h2>
      ) : !posts?.allPsts?.length ? (
        <h2 className="text-center text-gray-500">No posts found</h2>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts?.allPsts?.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Post Image */}
              <Link to={`/posts/${post._id}`}>
                <img
                  src={
                    post?.image ||
                    "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg"
                  }
                  alt={post.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Post Content */}
              <div className="p-5 flex flex-col gap-3">
                <Link
                  to="#"
                  className="inline-block text-xs font-semibold text-indigo-600 uppercase tracking-wide"
                >
                  {post?.category?.name || "Uncategorized"}
                </Link>

                <Link
                  to={`/posts/${post._id}`}
                  className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  {post?.title}
                </Link>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <p>
                    {post.author?.name || "Unknown"} •{" "}
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostList;
