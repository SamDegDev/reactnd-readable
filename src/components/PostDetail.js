import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchPostById, deletePostById, clearSelectedPost } from '../actions';
import { urlize } from '../utils/helpers';
import PostItem from './PostItem';

class PostDetail extends Component {
  componentDidMount() {
    this.props.fetchPostById(this.props.match.params.postId);
  }

  deleteCurrentPost(e) {
    e.preventDefault();
    if (window.confirm('Do you really want to delete this Post?')) {
      const post = this.props.posts.selected;
      this.props.deletePostById(post.id);
      this.props.history.push(`/r/${post.category}`)
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedPost();
  }

  render() {
    const post = this.props.posts.selected;
    if (post !== null) {
      return (
        <div className='App-wrapper'>
          <div className='App-content'>
            <div className='post-details'>
              <PostItem post={post} extended />
            </div>
          </div>
          <div className='App-sidebar'>
            <Link to={`/r/${post.category}/submit`}>Add a Post</Link>
            <Link to={`/r/${post.category}/edit/${post.id}/${urlize(post.title)}`}>Edit this Post</Link>
            <button onClick={(e) => this.deleteCurrentPost(e)}>Delete this Post</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div />
      );
    }
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostById: postId => dispatch(fetchPostById(postId)),
    deletePostById: postId => dispatch(deletePostById(postId)),
    clearSelectedPost: data => dispatch(clearSelectedPost(data)),
  }
};

PostDetail.propTypes = {
  fetchPostById: PropTypes.func,
  deletePostById: PropTypes.func,
  clearSelectedPost: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  posts: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));