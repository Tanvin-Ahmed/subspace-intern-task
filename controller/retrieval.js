const _ = require("lodash");

const getResult = (blogs = []) => {
  const totalBlog = _.size(blogs);
  const blogWithLongestTitle = _.maxBy(blogs, "title.length").title;
  const blogsWithPrivacyTitle = _.size(
    _.filter(blogs, (blog) => _.includes(blog.title.toLowerCase(), "privacy"))
  );
  const uniqueBlogTitles = _.uniqBy(blogs, "title").map((blog) => blog.title);
  return {
    totalNumberOfBlogs: totalBlog,
    titleOfTheLongestBlog: blogWithLongestTitle,
    blogsWithPrivacyTitle,
    arrayOfUniqueBlogTitles: uniqueBlogTitles,
  };
};

const memoizedCalculateResult = _.memoize(
  getResult,
  (blogs) => blogs,
  1000 * 60 // 1 minutes
);

const dataRetrieval = async (req, res) => {
  try {
    const blogs = await req.blogs;
    const cachedResult = memoizedCalculateResult(blogs);
    return res.status(200).json(cachedResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { dataRetrieval };
