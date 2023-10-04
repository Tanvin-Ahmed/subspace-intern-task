const express = require("express");
const { dataRetrieval } = require("../controller/retrieval");
const { search } = require("../controller/search");
const getBlogs = require("../middleware/get-blogs");

const router = express.Router();

router.get("/blog-stats", getBlogs, dataRetrieval);
router.get("/blog-search", getBlogs, search);

module.exports = router;
