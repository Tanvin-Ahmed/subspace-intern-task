const _ = require("lodash");

const getSearchResult = (query = "", data = []) => {
  return _.filter(data, (blog) =>
    _.includes(blog?.title?.toLowerCase(), query?.toLowerCase())
  );
};

const memoizedCalculateResult = _.memoize(
  getSearchResult,
  (query, data) => query,
  1000 * 60 // 1 minute
);

const search = async (req, res) => {
  try {
    const blogs = req.blogs;
    const { query } = req.query;

    const cachedResult = memoizedCalculateResult(query, blogs);
    return res.status(200).json(cachedResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { search };
