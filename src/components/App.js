import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Categories from './Categories';
import PostsList from './PostsList';
import PostDetail from './PostDetail';
import PostsCreate from './PostCreate';
import FaBook from 'react-icons/lib/fa/book';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Categories />
        <div className='App-header'>
          <div className='logo'><FaBook />&nbsp;Readable</div>
        </div>
        <Switch>
          <Route exact path='/' component={PostsList} />
          <Route exact path='/submit' component={PostsCreate} />
          <Route exact path='/r/:category/submit' component={PostsCreate} />
          <Route exact path='/r/:category' component={PostsList} />
          <Route exact path='/r/:category/:sorting' component={PostsList} />
          <Route path='/r/:category/comments/:postId/:postTitle' component={PostDetail} />
        </Switch>
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