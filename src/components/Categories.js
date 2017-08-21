import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
          <li><NavLink to='/' exact activeClassName='active'>all categories</NavLink></li>
          {categories && categories.map(category =>
            <li key={category.name}><NavLink to={`/r/${category.path}`} activeClassName='active'>{category.name}</NavLink></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Categories;