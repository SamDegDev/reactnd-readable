import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllCategories } from '../actions';

class Categories extends Component {

  componentDidMount() {
    // gets all the available categories
    this.props.fetchAllCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='App-nav'>
        <ul className='categories'>
          <li><NavLink exact to='/' className={categories.selected === 'all' ? 'active' : ''}>all categories</NavLink></li>
          {categories.list && categories.list.map(category =>
            <li key={category.name}>
              <NavLink
                to={`/r/${category.path}`}
                className={categories.selected === category.name ? 'active' : ''}
              >
                {category.name}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAllCategories: data => dispatch(fetchAllCategories()),
  }
};

Categories.propTypes = {
  categories: PropTypes.object,
  fetchAllCategories: PropTypes.func,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));