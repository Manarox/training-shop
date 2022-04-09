import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';
import { useSelector } from 'react-redux';
import Error from './components/Error';
import { useDispatch } from "react-redux";
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.loadReducer);

  useEffect(() => {
    dispatch({ type: 'LOADPROD' });  
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:id" element={isError ? <Error /> : !isLoading ? <ProductList /> : <Loading />} />
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Route>
    </Routes>
  
  );
}

export default App;