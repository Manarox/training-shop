import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';
// import store from './redux/Store';
// import { Provider } from 'react-redux';


function App() {

  
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:id" element={<ProductList />} />
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Route>
    </Routes>
  
  );
}


export default App;