import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Category from './components/Category';
import Home from './components/Home';
import Product from './components/Product';
import ProductCategory from './components/ProductCategory';

function App() {
  return (
    <div>
      <Header navBrand={'Toko Kasih'} />
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/category" component={Category} />
        <Route path="/product" component={Product} />
        <Route path="/productcategory" component={ProductCategory} />
      </div>
    </div>
  );
}

export default App;
