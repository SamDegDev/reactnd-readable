import React, { Component } from 'react';
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
          <li><a href='#' className='active'>all categories</a></li>
          {categories && categories.map(category =>
            <li key={category.name}><a href={`/r/${category.path}`}>{category.name}</a></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Categories;