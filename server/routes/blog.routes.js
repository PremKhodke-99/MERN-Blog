const blogRouter = require('express').Router();

const { fetchListOfBlogs, deleteBlog, updateBlog, addNewBlog } = require("../controller/blog.controller");

blogRouter.get('/', fetchListOfBlogs);
blogRouter.post('/add', addNewBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/delete/:id', deleteBlog);

module.exports = blogRouter;