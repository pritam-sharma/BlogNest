import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPostsAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";

const PublicPosts = () => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector((state) => state?.posts);

  useEffect(() => {
    dispatch(fetchPublicPostsAction());
  }, [dispatch]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      />

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-semibold text-green-700 bg-green-100 rounded-full shadow-sm">
            🌿 Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Read Our <span className="text-indigo-600">Trending</span> Articles
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Discover stories, ideas, and insights from writers around the world.
          </p>
        </div>

        {/* Post Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <h2 className="text-red-500">{error?.message}</h2>
          ) : !posts?.post?.length ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            posts.post.map((post) => (
              <div
                key={post._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <Link to={`/posts/${post._id}`}>
                  <img
                    className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
                    src={
                      post.image ||
                      "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg"
                    }
                    alt={post.title}
                  />
                </Link>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      {post?.category?.name || "Uncategorized"}
                    </span>
                    <p className="text-xs text-gray-400">
                      {new Date(post?.createdAt).toDateString()}
                    </p>
                  </div>

                  <Link
                    to={`/posts/${post._id}`}
                    className="block mb-3 text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors"
                  >
                    {post.title}
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      ✍️ {post.author?.name || "Unknown Author"}
                    </p>
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-indigo-600 font-semibold text-sm hover:underline flex items-center gap-1"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicPosts;
