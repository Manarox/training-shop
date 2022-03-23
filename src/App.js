import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';
// import store from './redux/Store';
// import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Error from './components/Error';
import Loading from './components/Loading';

function App() {
  // const {isLoading} = useSelector((state) => state.loadReducer);
  // console.log(isLoading)
  // const {isError} = useSelector((state) => state.loadReducer);
  // console.log(isError)
  const { isLoading, isError } = useSelector((state) => state.loadReducer);

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