const axios = require("axios");

const aip = "https://intent-kit-16.hasura.app/api/rest/blogs";
const adminSecret =
  "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6";

const getBlogs = async (req, res, next) => {
  try {
    const { data } = await axios(aip, {
      headers: {
        "x-hasura-admin-secret": adminSecret,
      },
    });
    req.blogs = data.blogs;
    next();
  } catch (error) {
    next(error);
    return res.status(404).json({ message: "Blogs not found" });
  }
};

module.exports = getBlogs;
