import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { fetchAllPosts, fetchPostsWithCategory, changeSelectedCategory } from '../actions';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import TimeAgo from 'react-timeago';

class PostsList extends Component {

  componentDidMount() {
    this.loadPosts(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.loadPosts(nextProps.location);
    }
  }

  loadPosts(location) {
    const selectedCategory = location.pathname.split('/r/').pop();
    if (selectedCategory !== this.props.categories.selected) {
      selectedCategory === '/' ? this.props.fetchAllPosts() : this.props.fetchPostsWithCategory(selectedCategory);
    }
    this.props.changeSelectedCategory(selectedCategory);
  }

  render() {
    const { posts } = this.props;

    return (
      <div className='App-content'>
        <ul className='list'>
          {posts.list && posts.list.map(post =>
            <li className='list-item' key={post.id}>
              <div className='votes'>
                <a className='arrow up' href='#up'><TiArrowUp size={24}/></a>
                <div className='score'>{post.voteScore}</div>
                <a className='arrow down' href='#down'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><a href='#title'>{post.title}</a></div>
                <div className='details'>submitted <TimeAgo date={post.timestamp} /> by {post.author} to <Link to={`/r/${post.category}`}>/r/{post.category}</Link></div>
                <div className='comments'><a href='#comments'>$TOTAL_COMMENTS</a> comments</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts,
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAllPosts: data => dispatch(fetchAllPosts()),
    fetchPostsWithCategory: data => dispatch(fetchPostsWithCategory(data)),
    changeSelectedCategory: data => dispatch(changeSelectedCategory(data)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));