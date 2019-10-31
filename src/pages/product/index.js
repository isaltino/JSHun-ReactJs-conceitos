import React, { Component } from 'react';
import api from '../../server/api';
import { Link } from 'react-router-dom';
import './style.css';

export default class Product extends Component {

  state = {
    product: {},
    loading: true
  }

  async componentDidMount(){
    const { id } = this.props.match.params;
    await api.get(`/products/${id}`).then(response => {
      this.setState({product: response.data});

    }).finally(() => this.setState({loading: false}));
  }


  render(){
    
    const { product, loading } = this.state;
    return (
      <div className="product-info">

        <div className={loading ? 'loading' : ''}>
          <div className="carregando"></div>
        </div>

        <article>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <a href={product.url}>Acessar</a> 
        </article>

        <div className="action">
          <Link to={'/'}>Voltar</Link>
        </div>
      </div>
    );
  }
}