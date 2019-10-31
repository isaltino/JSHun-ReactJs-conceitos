import React, { Component } from 'react';
import api from './../../server/api';
import { Link } from 'react-router-dom';
import './style.css';



export default class Main extends Component {

  state = {
    products: [],
    productInfo: {},
    page: 1,
    loading: true
  }

  componentDidMount(){
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    await api.get(`/products?page=${page}`).then(response => {
      const { docs, ...productInfo} = response.data;
      this.setState({products: docs, productInfo, page});
    }).finally(() => this.setState({loading: false}));
  }

  prevPage = () => {
    const { page} = this.state;
    if(page === 1) return;

    const pageNumber = page - 1;
    this.loadProducts(pageNumber);   

  }


  nextPage = () => {
    const { page, productInfo} = this.state;
    if(page === productInfo.pages) return;

    const pageNumber = page + 1;
    this.loadProducts(pageNumber);


  }

  render(){

    const { products, page, productInfo, loading} = this.state;
    return (
      <div className="product-list">
        <div className={loading ? 'loading' : ''}>
          <div className="carregando"></div>
          <div className="carregando"></div>
          <div className="carregando"></div>
        </div>
          

        {products.map(products => (
          
          <article key={products._id}> 
            <h2>{products.title}</h2>
            <p>{products.description}</p>
            <Link to={`/products/${products._id}`}>Acessar</Link>
          </article>
          
        ))}

        <div className="action">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
        </div>
      </div>  
    );
  }
}

