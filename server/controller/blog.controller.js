const mongoose = require('mongoose');
const Blog = require('../model/Blog');


//fetch list of blog
//add
//delete
//update

const fetchListOfBlogs = async (req, res) => {
    let blogList;

    try {
        blogList = await Blog.find();
    } catch (err) {
        console.log(e);
    }

    if (!blogList) {
        return res.status(404).json({ message: 'No Blogs Found' })
    }

    return res.status(200).json({ blogList })
};

const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreateBlog = new Blog({
        title, description, date: currentDate
    })

    try {
        await newlyCreateBlog.save();
    } catch (err) {
        console.log(err);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session);
        session.commitTransaction();
    } catch (err) {
        return res.send(500).json({ message: e })
    }

    return res.status(200).json({ newlyCreateBlog })
};

const deleteBlog = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: 'Blog not found' })
        }

        return res.status(200).json({ message: 'Successfully Deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).josn({ message: 'Unable to delete! Please try again' });
    }
};

const updateBlog = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;

    let currentBlogUpdate;

    try {
        currentBlogUpdate = await Blog.findByIdAndUpdate(id, {
            title, description
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong while updating! Please try again' })
    }

    if (!currentBlogUpdate) {
        return res.status(500).json({ message: "Unable to Update" })
    }

    return res.status(200).json({ currentBlogUpdate })
}

module.exports = {fetchListOfBlogs, deleteBlog, updateBlog, addNewBlog}