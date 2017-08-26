import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchAllPosts, fetchPostsWithCategory, changeSelectedCategory, changePostsSorting } from '../actions';
import { urlize } from '../utils/helpers';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import TimeAgo from 'react-timeago';

class PostsList extends Component {

  componentDidMount() {
    this.loadPosts(this.props.location);
    this.sortPosts(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.loadPosts(nextProps.location);
      this.sortPosts(nextProps.location);
    }
  }

  loadPosts(location) {
    const selectedCategory = getCategoryFromUrl(location.pathname);
    if (selectedCategory !== this.props.categories.selected) {
      selectedCategory === 'all' ? this.props.fetchAllPosts() : this.props.fetchPostsWithCategory(selectedCategory);
    }
    this.props.changeSelectedCategory(selectedCategory);
  }

  sortPosts(location) {
    const selectedSorting = getSortingFromUrl(location.pathname);
    //if (selectedSorting !== this.props.posts.sorting) {
    //}
    this.props.changePostsSorting(selectedSorting);
  }

  render() {
    const { posts } = this.props;
    return (
      <div className='App-content'>
        <ul className='sortmenu'>
          <li><Link to={`/r/${this.props.categories.selected}/top`} className={posts.sorting === 'top' ? 'active' : ''}>top</Link></li>
          <li><Link to={`/r/${this.props.categories.selected}/new`} className={posts.sorting === 'new' ? 'active' : ''}>new</Link></li>
        </ul>
        <ul className='list'>
          {posts.list && posts.list.map(post =>
            <li className='list-item' key={post.id}>
              <div className='votes'>
                <a className='arrow up' href='#up'><TiArrowUp size={24}/></a>
                <div className='score'>{post.voteScore}</div>
                <a className='arrow down' href='#down'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><Link to={`/r/${post.category}/comments/${post.id}/${urlize(post.title)}`}>{post.title}</Link></div>
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

function getCategoryFromUrl(url) {
  const match = url.match(/\/r\/([^\W]+)/i);
  return !match ? 'all' : match[1];
}

function getSortingFromUrl(url) {
  const match = url.match(/\/r\/[^\W]+\/([^\W]+)/i);
  return !match ? 'top' : match[1];
}

function mapStateToProps({ posts, categories }) {
  switch (posts.sorting) {
    case 'new':
      posts.list.sort((a,b) => a.timestamp < b.timestamp);
    break;
    default:
      posts.list.sort((a,b) => a.voteScore < b.voteScore);
    break;
  }
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
    changePostsSorting: data => dispatch(changePostsSorting(data)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));