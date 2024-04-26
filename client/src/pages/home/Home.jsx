import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context'
import axios from 'axios';
import styles from './Home.module.css'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext);
  const navigate = useNavigate()

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get('http://localhost:5000/api/blogs');
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList)
      setPending(false)
    } else {
      setPending(false)
      setBlogList([])
    }
  }

  function handleEdit(getCurrentBlogItem){
    navigate('/add-blog', {
      state: {getCurrentBlogItem}
    })
  }

  async function handleDelete(getCurrentId) {
    // console.log(getCurrentId);
    const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrentId}`);
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  useEffect(() => {
    fetchListOfBlogs()
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2>Blog List</h2>
      {
        pending ? <h1>Loading Blogs ! PLease wait</h1> :
          <div className={styles.blogList}>
            {
              blogList && blogList.length ? blogList.map(blogItem => (
                <div key={blogItem._id}>
                  <h3>{blogItem.title}</h3>
                  <p>{blogItem.description}</p>
                  <FaEdit
                    size={30}
                    onClick={() => handleEdit(blogItem)}
                  />
                  <FaTrash
                    size={30}
                    onClick={() => handleDelete(blogItem._id)}
                  />
                </div>
              )) : <h3>No Blogs Added</h3>
            }
          </div>
      }
    </div>
  )
}

export default Home