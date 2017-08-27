import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchAllPosts, fetchPostsWithCategory, changeSelectedCategory, changePostsSorting } from '../actions';
import PostItem from './PostItem';

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
    this.props.changePostsSorting(selectedSorting);
  }

  render() {
    const { posts } = this.props;
    return (
      <div className='posts-list'>
        <ul className='sortmenu'>
          <li><Link to={`/r/${this.props.categories.selected}/top`} className={posts.sorting === 'top' ? 'active' : ''}>top</Link></li>
          <li><Link to={`/r/${this.props.categories.selected}/new`} className={posts.sorting === 'new' ? 'active' : ''}>new</Link></li>
        </ul>
        <ul className='list'>
          {posts.list && posts.list.map(post =>
            <li className='list-item' key={post.id}>
              <PostItem post={post} />
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

PostsList.propTypes = {
  location: PropTypes.object,
  categories: PropTypes.object,
  posts: PropTypes.object,
  fetchAllPosts: PropTypes.func,
  fetchPostsWithCategory: PropTypes.func,
  changeSelectedCategory: PropTypes.func,
  changePostsSorting: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));