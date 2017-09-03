import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchPostById } from '../actions';
import PostItem from './PostItem';

class PostDetail extends Component {
  componentDidMount() {
    this.props.fetchPostById(this.props.match.params.postId);
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
  }
};

PostDetail.propTypes = {
  fetchPostById: PropTypes.func,
  match: PropTypes.object,
  posts: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));