import { useContext, useEffect } from 'react'
import styles from './AddNewBlog.module.css'
import { GlobalContext } from '../../context'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

function AddNewBlog() {

  const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation()

  // console.log(formData);

  async function handleSaveBlog() {
    const response = isEdit ?
      (
        await axios.put(`http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`, {
          title: formData.title,
          description: formData.description
        })
      ) : (
        await axios.post('http://localhost:5000/api/blogs/add', {
          title: formData.title,
          description: formData.description
        })
      )

    const result = await response.data;
    if (result) {
      setIsEdit(false)
      setFormData({
        title: '',
        description: '',
      });
      navigate('/');
    }
  }

  useEffect(() => {
    // console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true)
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description
      })
    }
  },[])

  return (
    <div className={styles.wrapper}>
      <h2>{isEdit ? 'Edit a Blog' : 'Add a Blog'}</h2>
      <div className={styles.formWrapper}>
        <input
          name='title'
          placeholder='Enter Blog Title'
          id='title'
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({
            ...formData,
            title: e.target.value
          })}
        />
        <textarea
          name="description"
          placeholder='Enter Blog Description'
          id="description"
          cols="20"
          rows="5"
          value={formData.description}
          onChange={(e) => setFormData({
            ...formData,
            description: e.target.value
          })}
        />
        <button onClick={handleSaveBlog}>{
          isEdit ? 'Edit Blog' : 'Add New Blog'
        }</button>
      </div>
    </div>
  )
}

export default AddNewBlog