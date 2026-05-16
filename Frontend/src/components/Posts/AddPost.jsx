import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categorySlices";
import { addPostsAction } from "../../redux/slices/posts/postSlices";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";

const AddPost = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { error, loading, success } = useSelector((state) => state?.posts);
  const { categories } = useSelector((state) => state?.categories);

  // Convert fetched categories to Select options
  const options = [
    ...(categories?.allCategories?.map((cat) => ({
      value: cat._id,
      label: cat.name,
    })) || []),
    { value: "add-new", label: "➕ Add new category" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    customCategory: "",
    content: "",
  });

  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // Validation
  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = "Title is required";
    if (!data.image) errors.image = "Image is required";
    if (!data.content) errors.content = "Content is required";
    if (!data.category && !data.customCategory)
      errors.category = "Category is required";
    return errors;
  };

  const handleBlur = (e) => {
    const formErrors = validateForm(formData);
    const { name } = e.target;
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption.value === "add-new") {
      setIsCustomCategory(true);
      setFormData({ ...formData, category: null });
    } else {
      setIsCustomCategory(false);
      setFormData({ ...formData, category: selectedOption.value });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const data = new FormData();
      data.append("title", formData.title);
      data.append(
        "category",
        isCustomCategory ? formData.customCategory : formData.category
      );
      data.append("content", formData.content);
      data.append("file", formData.image);

      dispatch(addPostsAction(data));

      setFormData({
        title: "",
        image: null,
        category: "",
        customCategory: "",
        content: "",
      });
      setIsCustomCategory(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Create a New Post
        </h2>
        <p className="mb-6 text-gray-500 text-center">
          Share your ideas and inspire others ✨
        </p>

        {error && <ErrorMsg message={error?.message} />}
        {success && <SuccessMsg message="Post created successfully!" />}

        {/* Title */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Title</span>
          <input
            className="py-3 px-3 w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Enter the post title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors?.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </label>

        {/* Image */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Image</span>
          <input
            className="py-3 px-3 w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            type="file"
            name="image"
            onChange={handleFileChange}
            onBlur={handleBlur}
          />
          {errors?.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </label>

        {/* Category */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Category</span>
          <Select
            options={options}
            onChange={handleSelectChange}
            placeholder="Select or add a category"
            onBlur={handleBlur}
          />

          {isCustomCategory && (
            <input
              type="text"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              placeholder="Enter a new category"
              className="mt-3 py-2 px-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              required
            />
          )}

          {errors?.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </label>

        {/* Content */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Content</span>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="5"
            placeholder="Write your post content..."
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          ></textarea>
          {errors?.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </label>

        {/* Submit */}
        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default AddPost;
