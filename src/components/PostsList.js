import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchAllPosts } from '../actions';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';

class PostsList extends Component {

  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <div className='App-content'>
        <ul className='list'>
          {posts && posts.map(post =>
            <li className='list-item' key={post.id}>
              <div className='votes'>
                <a className='arrow up' href='#up'><TiArrowUp size={24}/></a>
                <div className='score'>{post.voteScore}</div>
                <a className='arrow down' href='#down'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><a href='#title'>{post.title}</a></div>
                <div className='details'>submitted $TIME by {post.author} to <a href='#category'>{post.category}</a></div>
                <div className='comments'><a href='#comments'>$TOTAL_COMMENTS</a> comments</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(posts) {
  return {
    ...posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAllPosts: data => dispatch(fetchAllPosts()),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));