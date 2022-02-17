import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Notfound } from './pages/Notfound';
import { Category } from './pages/Category';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:id" element={<ProductList />} />
          <Route path="*" element={<Home />} />
          <Route path="training-shop" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;