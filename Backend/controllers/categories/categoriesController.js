const Category = require("../../models/Categories/Categories");
const asyncHandler = require("express-async-handler");
//@desc Create a new category
//@route POST /api/v1/categories
//@access private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const isCategoryPresent = await Category.findOne({ name });
  if (isCategoryPresent) {
    throw new Error("Category Already Exists");
  }
  const category = await Category.create({
    name: name,
    author: req?.userAuth?._id,
  });
  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

//@desc Fetch all categories
//@route GET /api/v1/categories
//@access public
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({});
  res.status(201).json({
    status: "success",
    message: "All Categories fetched successfully",
    allCategories,
  });
});

//@desc Delete single category
//@route Delete /api/v1/categories/:id
//@access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const catId = req.params.id;
  await Category.findByIdAndDelete(catId);
  res.status(201).json({
    status: "success",
    message: "Category deleted successfully",
  });
});

//@desc Update single category
//@route PUT /api/v1/categories/:id
//@access private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const catId = req.params.id;
  const name = req.body.name;
  const updatedCategory = await Category.findByIdAndUpdate(
    catId,
    { name: name },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "success",
    message: "Category updated successfully",
    updatedCategory,
  });
});
