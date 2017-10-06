import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchPostById, deletePostById, clearSelectedPost } from '../actions';
import { urlize } from '../utils/helpers';
import PostItem from './PostItem';
import CommentForm from './CommentForm';

class PostDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      commentModalOpen: false,
      commentId: null,
    }
  }

  componentDidMount() {
    // gets the current post details
    this.props.fetchPostById(this.props.match.params.postId);
  }

  // deletes the current post and redirects to the category list
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

  // opens the modal window to add/edit comments
  openCommentModal = (commentId = null) => {
    this.setState(() => ({
      commentModalOpen: true,
      commentId: commentId,
    }));
  }

  // closes teh comments modal window
  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
      commentId: null,
    }));
  }

  render() {
    const post = this.props.posts.selected;
    if (post !== null) {
      return (
        <div className='App-wrapper'>
          <div className='App-content'>
            <div className='post-details'>
              <PostItem post={post} openCommentModal={this.openCommentModal} extended />
            </div>
          </div>
          <div className='App-sidebar'>
            <button onClick={() => this.openCommentModal()} >Add a Comment</button>
            <Link to={`/r/${post.category}/edit/${post.id}/${urlize(post.title)}`}>Edit this Post</Link>
            <button onClick={(e) => this.deleteCurrentPost(e)}>Delete this Post</button>
          </div>

          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={this.state.commentModalOpen}
            onRequestClose={this.closeCommentModal}
            contentLabel='Modal'
          >
            <div>
              {this.state.commentModalOpen && <CommentForm closeCommentModal={this.closeCommentModal} commentId={this.state.commentId} />}
            </div>
          </Modal>

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
  if (posts.selected && posts.selected.comments && posts.selected.comments.length > 0 && posts.commentsSorting) {
    switch (posts.commentsSorting) {
      case 'new':
        // sorts the post by date
        posts.selected.comments.sort((a,b) => a.timestamp < b.timestamp);
      break;
      default:
        // sorts the posts by score
        posts.selected.comments.sort((a,b) => a.voteScore < b.voteScore);
      break;
    }
  }
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