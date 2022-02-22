import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';

function App() {
  return (
    
      <Routes>
        <Route path="/training-shop" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/training-shop/:category" element={<Category />} />
          <Route path="/training-shop/:category/:id" element={<ProductList />} />
          <Route path="*" element={<Home />} />
          <Route path="training-shop" element={<Home />} />
        </Route>
      </Routes>
    
  );
}


export default App;