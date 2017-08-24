import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchAllCategories } from '../actions';

class Categories extends Component {

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    const { categories } = this.props;

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

function mapStateToProps(categories) {
  return {
    ...categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAllCategories: data => dispatch(fetchAllCategories()),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));