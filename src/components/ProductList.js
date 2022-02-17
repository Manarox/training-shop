import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';
import { useParams } from "react-router-dom";
import './ProductList.css';
import Data from "../pages/data.json";

const ProductList = () => {
  const {id} = useParams();
  const {category} = useParams();
  const arr = [];
  
  if ({category}.category === 'women') {
    Data.women.map(post => {
      return (
        arr.push(post)
      )
    })

  } else if ({category}.category === 'men') {
      Data.men.map(post => {
        return (
          arr.push(post)
        );
      })
  }
  
return (
<>
<div className="page-product" data-test-id={`product-page-${category}`}>

  </div>
  </>
      
  )
}
    
export {ProductList}