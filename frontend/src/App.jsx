import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import ShowBooks from './pages/ShowBooks';

function App() {
  return (
    <Routes>
      <Route path='/' element= {<Home/>} />
      <Route path='/books/create' element= {<CreateBooks/>} />
      <Route path='/books/edit/:id' element= {<EditBook/>} />
      <Route path='/books/delete/:id' element= {<DeleteBook/>} />
      <Route path='/books/details/:id' element= {<ShowBooks/>} />
    </Routes>

  )
}

export default App