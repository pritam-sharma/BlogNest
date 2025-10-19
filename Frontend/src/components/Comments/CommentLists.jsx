const CommentsList = ({ comments }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-none">
          <img
            src="https://placehold.co/50x50"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
        </div>
        <div className="flex-grow">
          {comments?.length <= 0 ? (
            <h2>No Comments</h2>
          ) : (
            comments?.map((comment) => {
              return (
                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-4 overflow-hidden transition hover:shadow-md">
                  <div className="px-4 py-3 flex justify-between items-center bg-blue-50">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-700">
                        {comment?.author?.username}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(comment?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {comment?.message}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
