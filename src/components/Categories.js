import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../actions';

class Categories extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    console.log(this.props);
    
    return (
      <div className='App-nav'>
        <ul className='categories'>
          <li><NavLink to='/' exact activeClassName='active'>all categories</NavLink></li>
          {//categories && categories.map(category =>
          //  <li key={category.name}><NavLink to={`/r/${category.path}`} activeClassName='active'>{category.name}</NavLink></li>
          //)
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(categories) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: data => dispatch(getCategories()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);