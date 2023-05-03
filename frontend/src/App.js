import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddRole from './pages/AddRole';

function App() {
  return (
    <Router>
      {/* <header className='w-full flex justify-between items-center bg-[#fafafc] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'> */}
        {/* <Link to="/">
          <div className='flex justify-center items-center'>
            <img src={logo} alt="logo" className='w-[40px] object-contain' />
            <p className='ml-3 font-[600]'>DELL • E</p>
          </div>
        </Link>
        <Link to='/create-post' className=' font-medium bg-[#232323] text-white px-4 py-2 rounded-md'>
          Create
        </Link> */}
      {/* </header> */}
      <main className='sm:p-8 px-4 py-8 w-[100%] bg-[#FAFAFC] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/add-role' element={<AddRole />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
