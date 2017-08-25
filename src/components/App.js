import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
import Categories from './Categories';
import PostsList from './PostsList';
import PostsDetail from './PostsDetail';
import FaBook from 'react-icons/lib/fa/book';
import '../css/App.css';

class App extends Component {
  render() {
    const { sorting } = this.props.posts;
    console.log(this.props)
    return (
      <div className='App'>
        <Categories />
        <div className='App-header'>
          <div className='logo'><FaBook/>&nbsp;Readable</div>
            { sorting != null &&
              <ul className='sortmenu'>
                <li><NavLink to={`/r/${this.props.categories.selected}/top`} activeClassName='active' className={sorting === 'top' ? 'active' : ''}>top</NavLink></li>
                <li><NavLink to={`/r/${this.props.categories.selected}/new`} activeClassName='active' className={sorting === 'new' ? 'active' : ''}>new</NavLink></li>
              </ul>
            }
        </div>
        <Switch>
          <Route path="/r/:category/comments/:postId/:postTitle" component={PostsDetail}/>
          <Route path="/r/:category" component={PostsList}/>
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