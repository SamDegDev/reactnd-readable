import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/ReadableAPI';

class Categories extends Component {
  state = {
    categories: null,
  };

  componentDidMount() {
    getCategories()
      .then(categories => this.setState(() => ({
        categories,
      })));
  }

  render() {
    const { categories } = this.state;

    return (
      <div className='App-nav'>
        <ul className='categories'>
          <li><Link to='/' exact activeClassName='active'>all categories</Link></li>
          {categories && categories.map(category =>
            <li key={category.name}><Link to={`/r/${category.path}`} activeClassName='active'>{category.name}</Link></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Categories;