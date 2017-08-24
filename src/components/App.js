import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Categories from './Categories';
import PostsList from './PostsList';
import FaBook from 'react-icons/lib/fa/book';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Categories />
        <div className='App-header'>
          <div className='logo'><FaBook/>&nbsp;Readable</div>
          <ul className='sortmenu'>
            <li><NavLink to={`/r/${this.props.categories.selected}/top`} activeClassName='active'>top</NavLink></li>
            <li><NavLink to={`/r/${this.props.categories.selected}/new`} activeClassName='active'>new</NavLink></li>
          </ul>
        </div>
        <PostsList />
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

export default withRouter(connect(mapStateToProps)(App));