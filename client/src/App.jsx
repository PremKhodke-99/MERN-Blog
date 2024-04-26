import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import AddNewBlog from './pages/add-blog/AddNewBlog'

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/add-blog' element={<AddNewBlog />}/>
      </Routes>
    </div>
  )
}

export default App
